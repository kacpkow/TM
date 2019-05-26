from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from posts.forms import UploadFileForm, SignupForm
from django.conf import settings
from django.contrib import messages
from posts.models import Upload, Editor
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_202_ACCEPTED,
    HTTP_204_NO_CONTENT
)
from rest_framework.response import Response
import json
from django.core.serializers.json import DjangoJSONEncoder
from posts import serializers as postSerializers
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework import generics
from cairosvg import svg2png
import os
import time


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def api_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'message': 'Proszę podać nazwę użytkownika i hasło'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'message': 'Niepoprawne dane logowania'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    is_staff = user.is_staff
    return Response({'token': token.key, 'isStaff': is_staff },
                    status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def api_register(request):
    VALID_USER_FIELDS = [f.name for f in User._meta.fields]
    DEFAULTS = {
        # you can define any defaults that you would like for the user, here
    }
    serialized = postSerializers.UserSerializer(data=request.data)
    if serialized.is_valid():
        user_data = {field: data for (field, data) in request.data.items() if field in VALID_USER_FIELDS}
        user_data.update(DEFAULTS)
        user = User.objects.create_user(
            **user_data
        )
        user.is_active = False
        user.save()
        return Response(postSerializers.UserSerializer(instance=user).data, status=HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def api_logout(request):
    request.user.auth_token.delete()
    return Response(status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def api_upload_image(request):
    VALID_UPLOAD_FIELDS = [f.name for f in Upload._meta.fields]
    DEFAULTS = {

    }
    serialized = postSerializers.UploadSerializer(data=request.data)
    print(serialized)
    if serialized.is_valid():
        upload_data = {field: data for (field, data) in request.data.items() if field in VALID_UPLOAD_FIELDS}
        upload_data.update(DEFAULTS)
        upload = Upload.objects.create(
            **upload_data
        )
        print("is valid")
        upload.author = request.user
        upload.timestamp = timezone.now()
        upload.save()
        return Response(postSerializers.UploadSerializer(instance=upload).data, status=HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["DELETE"])
def api_delete_image(request):
    print(request.data)
    id = request.data.get("id")
    try:
        file = Upload.objects.get(pk=id)
        file.delete()
    except Upload.DoesNotExist:
        return Response(status=HTTP_400_BAD_REQUEST)
    posts = Upload.objects.all()
    if len(posts) != 0:
        post = Upload.objects.get(pk=posts[0].pk)
        print(post.timestamp)
        post.timestamp = timezone.now()
        post.save()
    return Response(status=HTTP_204_NO_CONTENT)


def get_latest(request):
    editors = Editor.objects.all()
    if len(editors) == 0:
        return JsonResponse({'timestamp': 'null'})

    temp_timestamp = editors[0].updated_at
    for editor in editors:
        if editor.updated_at > temp_timestamp:
            temp_timestamp = editor.updated_at
    return JsonResponse({'timestamp': temp_timestamp})


def get_image_urls(request):
    objects = Editor.objects.all()
    serializer = postSerializers.EditorSerializer(objects, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@api_view(["GET"])
def api_get_user_image_urls(request):
    objects = Upload.objects.select_related().filter(author_id=request.user.id)
    serializer = postSerializers.UploadSerializer(objects, many=True)
    return Response({"images": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_user_latest_image_urls(request):
    objects = Upload.objects.select_related().filter(author_id=request.user.id).order_by('-id')[:3]
    serializer = postSerializers.UploadSerializer(objects, many=True)
    return Response({"images": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_users(request):
    objects = User.objects.all()
    serializer = postSerializers.UserSerializer(objects, many=True)
    return Response({"users": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_user(request):
    objects = User.objects.select_related().filter(id = request.user.id)
    serializer = postSerializers.UserSerializer(objects, many=True)
    return Response({"user": serializer.data})

@api_view(["PATCH"])
def api_change_user_values(request):
    user = User.objects.get(id = request.user.id)
    serialized = postSerializers.UserSerializer(user, data=request.data, partial=True)
    
    if serialized.is_valid():
        user.username = request.data.get("username")
        user.email = request.data.get("email")
        user.first_name = request.data.get("first_name")
        user.last_name = request.data.get("last_name")

        if request.data.get("password"):
            if request.data.get("password") != request.data.get("repassword"):
                return Response({"password": ["Hasła muszą być takie same"]}, status=HTTP_400_BAD_REQUEST)

            user.password = make_password(request.data.get("password"), salt=None, hasher='default')

        user.save()
        return Response(postSerializers.UserSerializer(instance=user).data, status=HTTP_202_ACCEPTED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)

def get_usernames(request):
    jsondata = serializers.serialize(
        'json', User.objects.all(), fields=('username', 'first_name', 'last_name', 'email',))
    return HttpResponse(jsondata, content_type='application/json')

@csrf_exempt
@api_view(["POST"])
def api_activate_user(request):
    idUser = request.data.get("userId")
    user = User.objects.get(id = idUser)
    user.is_active = True
    user.save()
    return Response(status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def api_deactivate_user(request):
    idUser = request.data.get("userId")
    user = User.objects.get(id = idUser)
    user.is_active = False
    user.save()
    return Response(status=HTTP_200_OK)

class EditorList(generics.ListCreateAPIView):
    queryset = Editor.objects.all()
    serializer_class = postSerializers.EditorSerializer
        
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        author = self.request.user
        return Editor.objects.select_related().filter(author_id = author.id)


class EditorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Editor.objects.all()
    serializer_class = postSerializers.EditorSerializer

@csrf_exempt
def get_image(request, id):
    image = get_object_or_404(Editor, pk=id)
    now = int(time.time())

    pngFile = "media/%s-file.png" % (now)

    try:
        svg2png(bytestring=image.source, write_to=pngFile)
    except:
        print("error on converting svg to png")
        return Response(status=HTTP_400_BAD_REQUEST)

    try:
        with open(pngFile, "rb") as f:
            os.remove(pngFile)
            return HttpResponse(f.read(), content_type="image/png")
    except:
        print("error on streaming png to http response")
        return Response(status=HTTP_400_BAD_REQUEST)
