from django.shortcuts import render
from rest_framework import generics

from account.models import UserInfo, UserItem
from account.serializer import UserInfoSerializer, UserItemSerializer


class UserInfoListAPIView(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class UserItemListAPIView(generics.ListCreateAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer
