from django.contrib import admin
from posts.models import Upload, Editor
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

"""
class PersonInline(admin.StackedInline):
    model = Person
    can_delete = False
    verbose_name_plural = 'Person'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    inlines = [PersonInline]

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)"""

admin.site.register(Upload)
admin.site.register(Editor)
