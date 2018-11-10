from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from posts.forms import UploadFileForm, SignupForm
from django.conf import settings
from django.contrib import messages
from posts.models import Upload, Person
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.utils import timezone


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
    upload_counter = len(Upload.objects.select_related().filter(author_id=request.user.id))
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

    return redirect('upload')


def get_usernames(request):
    users = User.objects.all()
    jsondata = serializers.serialize(
        'json', users, fields=('username', 'email',))
    return HttpResponse(jsondata, content_type='application/json')


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
            user.save()
            person = Person(user_id=user.id, is_activated=False)
            person.save()
            messages.success(request, 'Twoje konto oczekuje na aktywację')
            return render(request, 'index.html', {'title': 'Strona domowa', })
    else:
        form = SignupForm()
    return render(request, 'register.html', {'form': form})


def get_image_urls(request):
    posts = Upload.objects.all()
    jsondata = serializers.serialize('json', posts, fields=('pic',))
    return HttpResponse(jsondata, content_type='application/json')