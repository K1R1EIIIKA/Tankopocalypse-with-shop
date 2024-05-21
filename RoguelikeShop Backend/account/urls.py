from django.urls import path

from account.views import *

urlpatterns = [
    path('roles/', RoleListCreate.as_view(), name='role-list'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDestroy.as_view(), name='role-detail'),
    path('user-items/', UserItemListCreate.as_view(), name='user-item-list'),
    path('user-items/<int:pk>/', UserItemRetrieveUpdateDestroy.as_view(), name='user-item-detail'),
    path('user-info/', UserInfoDetail.as_view(), name='user-info-detail'),
]
