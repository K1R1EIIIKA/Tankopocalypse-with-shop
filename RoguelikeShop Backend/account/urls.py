from django.urls import path

from account.views import UserItemListCreate, UserItemRetrieveUpdateDestroy, UserInfoListCreate, \
    UserInfoRetrieveUpdateDestroy, RoleListCreate, RoleRetrieveUpdateDestroy

urlpatterns = [
    path('roles/', RoleListCreate.as_view(), name='role-list'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDestroy.as_view(), name='role-detail'),
    path('user-items/', UserItemListCreate.as_view(), name='user-item-list'),
    path('user-items/<int:pk>/', UserItemRetrieveUpdateDestroy.as_view(), name='user-item-detail'),
    path('user-info/', UserInfoListCreate.as_view(), name='user-info-list'),
    path('user-info/<int:pk>/', UserInfoRetrieveUpdateDestroy.as_view(), name='user-info-detail'),
]
