"""TM_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from posts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('login', auth_views.LoginView.as_view(), name='login'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
    path('upload/', views.upload_file, name="upload"),
    path('delete/<int:id>', views.delete, name="delete"),
    path('not_allowed/', views.display_not_allowed_page, name="not_allowed"),
    path('users/', views.get_usernames, name='users'),
    path('latest/', views.get_latest, name='latest'),
    path('register/', views.register, name='register'),
    path('images/', views.get_image_urls, name='images'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/login/', views.api_login),
    path('api/logout/', views.api_logout),
    path('api/register/', views.api_register),
    path('api/images/', views.api_get_user_image_urls, name='images_api'),
    path('api/latest/', views.api_get_user_latest_image_urls, name='images_latest_api'),
    path('api/users/', views.api_get_users, name='users_api'),
    path('api/user/', views.api_get_user, name='user_api'),
    path('api/change_user_values/', views.api_change_user_values, name='user_change_values_api'),
    path('api/upload_image/', views.api_upload_image, name='upload_image_api'),
    path('api/delete_image/', views.api_delete_image, name='delete_image_api'),
    path('api/activate_user/', views.api_activate_user, name='activate_user_api'),
    path('api/deactivate_user/', views.api_deactivate_user, name='deactivate_user_api'),
    path('api/editor/', views.EditorList.as_view()),
    path('api/editor/<int:pk>/', views.EditorDetail.as_view()),
    path('image/<int:id>/', views.get_image, name='get_image'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
