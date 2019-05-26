from posts.models import Upload, Editor
from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils import timezone

class UploadSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(default=None)
    timestamp = serializers.CharField(default=timezone.now())

    class Meta:
        model = Upload
        fields = (
        'id',
        'pic_text',
        'pic',
        'author',
        'timestamp'
        )

    def create(self, validated_data):
        upload = Upload.objects.create(
            pic=validated_data['pic'],
            pic_text=validated_data['pic_text'],
        )

        upload.save()

        return upload

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff', 'is_active', 'first_name', 'last_name' )
        read_only_fields = ('id', 'is_staff', 'is_active',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

class EditorSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Editor
        fields = "__all__"