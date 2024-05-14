from django.contrib import admin

from account.models import UserInfo, UserItem

admin.site.site_header = 'Панель администратора'

admin.site.register(UserInfo)
admin.site.register(UserItem)
