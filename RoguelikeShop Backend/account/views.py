from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from account.serializer import *
from authentication.models import User


class RoleListCreate(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    http_method_names = ['get', 'put', 'delete']


class UserItemListCreate(generics.ListCreateAPIView):
    serializer_class = UserItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserItem.objects.filter(user=self.request.user)


class UserItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserItem.objects.all()
    serializer_class = UserItemSerializer
    http_method_names = ['get', 'put', 'delete']


class UserSkinListCreate(generics.ListCreateAPIView):
    serializer_class = UserSkinSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserSkin.objects.filter(user=self.request.user)


class UserSkinRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserSkin.objects.all()
    serializer_class = UserSkinSerializer
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


@method_decorator(csrf_exempt, name='dispatch')
class MotherloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(111)
        user = request.user.id
        print(user)

        try:
            user = User.objects.get(id=user)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user_info = user.userinfo
        print(user_info.role.name.lower())
        if user_info.role.name.lower() == 'crush':
            if user_info.balance is None:
                user_info.balance = 1000
            user_info.balance += 1000
            user_info.save()

            return Response({'message': 'Motherload added'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User is not Crush'}, status=status.HTTP_403_FORBIDDEN)
