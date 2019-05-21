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
from posts import serializers as postsSerializers
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework import generics


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
    serialized = serializers.UserSerializer(data=request.data)
    if serialized.is_valid():
        user_data = {field: data for (field, data) in request.data.items() if field in VALID_USER_FIELDS}
        user_data.update(DEFAULTS)
        user = User.objects.create_user(
            **user_data
        )
        user.is_active = False
        user.save()
        return Response(serializers.UserSerializer(instance=user).data, status=HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def api_logout(request):
    request.user.auth_token.delete()
    return Response(status=HTTP_200_OK)


@login_required(login_url='/not_allowed')
def upload_file(request):
    files = Upload.objects.select_related().filter(author_id=request.user.id)

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)

        if form.is_valid():
            form_data = form.save(commit=False)
            form_data.author = request.user
            form_data.timestamp = timezone.now()
            form_data.save()

            messages.success(request, 'Obraz został pomyślnie wgrany')

            return redirect('upload')

    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form, 'files': files, 'title': 'Upload'})

@csrf_exempt
@api_view(["POST"])
def api_upload_image(request):
    VALID_UPLOAD_FIELDS = [f.name for f in Upload._meta.fields]
    DEFAULTS = {

    }
    serialized = serializers.UploadSerializer(data=request.data)
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
        return Response(serializers.UploadSerializer(instance=upload).data, status=HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)



def home(request):
    upload_counter = len(
        Upload.objects.select_related().filter(author_id=request.user.id))
    return render(
        request,
        'index.html',
        {
            'title': 'Strona domowa',
            'upload_counter': upload_counter,
        }
    )


def display_not_allowed_page(request):
    return render(
        request,
        'not_allowed.html',
        {
            'title': 'Permission denied',
        }
    )


def delete(request, id):
    try:
        file = Upload.objects.get(pk=id)
        file.delete()
    except Upload.DoesNotExist:
        messages.error(
            request, 'Nastąpiła próba usunięcia pliku, który nie istnieje')
    posts = Upload.objects.all()
    if len(posts) != 0:
        post = Upload.objects.get(pk=posts[0].pk)
        print(post.timestamp)
        post.timestamp = timezone.now()
        post.save()

    return redirect('upload')

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
    posts = Upload.objects.all()
    if len(posts) == 0:
        return JsonResponse({'timestamp': 'null'})

    temp_timestamp = posts[0].timestamp
    for post in posts:
        if post.timestamp > temp_timestamp:
            temp_timestamp = post.timestamp
    return JsonResponse({'timestamp': temp_timestamp})


def register(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            messages.success(request, 'Twoje konto oczekuje na aktywację')
            return render(request, 'index.html', {'title': 'Strona domowa', })
    else:
        form = SignupForm()
    return render(request, 'register.html', {'form': form})


def get_image_urls(request):
    raw_data = serializers.serialize(
        'python', Upload.objects.all(), fields=('pic_text', 'pic', 'author',))
    actual_data = [d['fields'] for d in raw_data]
    output = json.dumps(actual_data, separators=(',', ':'))
    return HttpResponse(output, content_type='application/json')

@csrf_exempt
@api_view(["GET"])
def api_get_user_image_urls(request):
    objects = Upload.objects.select_related().filter(author_id=request.user.id)
    serializer = postsSerializers.UploadSerializer(objects, many=True)
    return Response({"images": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_user_latest_image_urls(request):
    objects = Upload.objects.select_related().filter(author_id=request.user.id).order_by('-id')[:3]
    serializer = postsSerializers.UploadSerializer(objects, many=True)
    return Response({"images": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_users(request):
    objects = User.objects.all()
    serializer = postsSerializers.UserSerializer(objects, many=True)
    return Response({"users": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_user(request):
    objects = User.objects.select_related().filter(id = request.user.id)
    serializer = postsSerializers.UserSerializer(objects, many=True)
    return Response({"user": serializer.data})

@api_view(["PATCH"])
def api_change_user_values(request):
    user = User.objects.get(id = request.user.id)
    serialized = postsSerializers.UserSerializer(user, data=request.data, partial=True)
    
    if serialized.is_valid():
        user.username = request.data.get("username")
        user.first_name = request.data.get("first_name")
        user.last_name = request.data.get("last_name")
        user.email = request.data.get("email")

        if request.data.get("password"):
            if request.data.get("password") != request.data.get("repassword"):
                return Response({"password": ["Hasła muszą być takie same"]}, status=HTTP_400_BAD_REQUEST)

            user.password = make_password(request.data.get("password"), salt=None, hasher='default')

        user.save()
        return Response(serializers.UserSerializer(instance=user).data, status=HTTP_202_ACCEPTED)
    else:
        return Response(serialized._errors, status=HTTP_400_BAD_REQUEST)

def get_usernames(request):
    jsondata = serializers.serialize(
        'json', User.objects.all(), fields=('first_name', 'last_name', 'email',))
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
    serializer_class = postsSerializers.EditorSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        author = self.request.user
        return Editor.objects.select_related().filter(author_id = author.id)


class EditorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Editor.objects.all()
    serializer_class = postsSerializers.EditorSerializer

@csrf_exempt
def get_image(request, id):
    image = get_object_or_404(Editor, pk=id)
    return HttpResponse(image.source)