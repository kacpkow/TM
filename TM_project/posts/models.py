from django.db import models
from django.forms import ModelForm
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.contrib import admin
import unicodedata


def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    name = instance.pic_text
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore')
    return 'images/%s.%s' % (name, extension)


class Upload(models.Model):
    pic_text = models.TextField()
    pic = models.ImageField(upload_to=upload_location)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    timestamp = models.TextField()

    @property
    def get_absolute_url(self):
        return "{0}{1}".format(settings.MEDIA_URL, self.pic)
