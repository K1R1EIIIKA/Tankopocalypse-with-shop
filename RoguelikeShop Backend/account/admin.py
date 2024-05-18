from django.contrib import admin

from account.models import UserInfo, UserItem, Role, UserSkin

admin.site.site_header = 'Панель администратора'

admin.site.register(UserInfo)
admin.site.register(UserItem)
admin.site.register(UserSkin)
admin.site.register(Role)
