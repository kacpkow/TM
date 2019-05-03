from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from posts.forms import UploadFileForm, SignupForm
from django.conf import settings
from django.contrib import messages
from posts.models import Upload
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
    HTTP_201_CREATED
)
from rest_framework.response import Response
import json
from django.core.serializers.json import DjangoJSONEncoder
from posts import serializers
from rest_framework.renderers import JSONRenderer

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def api_login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
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

            messages.success(request, 'Obraz został pomyślnie wgrany.')

            return redirect('upload')

    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form, 'files': files, 'title': 'Upload'})


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
    serializer = serializers.UploadSerializer(objects, many=True)
    return Response({"images": serializer.data})

@csrf_exempt
@api_view(["GET"])
def api_get_users(request):
    objects = User.objects.all()
    serializer = serializers.UserSerializer(objects, many=True)
    return Response({"users": serializer.data})


def get_usernames(request):
    jsondata = serializers.serialize(
        'json', User.objects.all(), fields=('first_name', 'last_name', 'email',))
    return HttpResponse(jsondata, content_type='application/json')

