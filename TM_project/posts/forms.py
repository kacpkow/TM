from django import forms
from posts.models import Upload
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name',
                  'email', 'password1', 'password2')


class UploadFileForm(forms.ModelForm):
    pic_text = forms.CharField(max_length=50)
    pic = forms.ImageField()

    class Meta:
        model = Upload
        fields = ['pic', 'pic_text', ]
