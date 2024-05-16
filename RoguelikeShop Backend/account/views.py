from django.shortcuts import render
from rest_framework import generics

from account.models import UserInfo, UserItem, Role
from account.serializer import UserItemSerializer, UserInfoSerializer, RoleSerializer


class RoleListCreate(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    http_method_names = ['get', 'put', 'delete']


class UserItemListCreate(generics.ListCreateAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer


class UserItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer
    http_method_names = ['get', 'put', 'delete']


class UserInfoListCreate(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class UserInfoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    http_method_names = ['get', 'put', 'delete']
