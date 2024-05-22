from django.http import Http404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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


class UserInfoDetail(generics.RetrieveAPIView):
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        queryset = UserInfo.objects.filter(user=user)
        if queryset.exists():
            return queryset.first()
        else:
            raise Http404("UserInfo not found")
