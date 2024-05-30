from django.contrib import admin

from account.models import UserInfo, UserItem, Role, UserSkin, UserResults

admin.site.site_header = 'Панель администратора'

admin.site.register(UserInfo)
admin.site.register(UserItem)
admin.site.register(UserSkin)
admin.site.register(Role)


@admin.register(UserResults)
class Admin(admin.ModelAdmin):
    list_display = ('user', 'score')
    search_fields = ('user', 'score')
    list_filter = ('user', 'score')
    ordering = ('user', 'score')
    fields = ('user', 'score')
