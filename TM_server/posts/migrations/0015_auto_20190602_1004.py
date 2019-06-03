# Generated by Django 2.2 on 2019-06-02 10:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0014_devicepermissions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devicepermissions',
            name='device',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='posts.Device'),
        ),
        migrations.AlterField(
            model_name='devicepermissions',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]