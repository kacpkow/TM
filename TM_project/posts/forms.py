from django import forms
from posts.models import Upload
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')

    class Meta:
        model = User
        fields = ('username','email', 'password')

    def signup(self, request, user):
        user.username = self.cleaned_data['username']
        user.password = self.cleaned_data['password']
        user.email= self.cleaned_data['email']
        user.is_active = False
        user.save()

class UserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields


class UploadFileForm(forms.ModelForm):
    pic_text = forms.CharField(max_length=50)
    pic = forms.ImageField()

    class Meta:
        model = Upload
        fields = ['pic', 'pic_text', ]
