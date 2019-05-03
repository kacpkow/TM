from posts.models import Upload
from rest_framework import serializers
from django.contrib.auth.models import User

class UploadSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField()

    class Meta:
        model = Upload
        fields = (
        'id',
        'pic_text',
        'pic',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email' )
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user