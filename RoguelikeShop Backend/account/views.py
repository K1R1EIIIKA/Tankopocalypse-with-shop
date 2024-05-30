from django.http import Http404, QueryDict
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import json

from account.serializer import *
from authentication.models import User
from shop.models import Item


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

    def post(self, request, *args, **kwargs):
        user = self.request.user
        user_items_data = self.request.data
        if type(user_items_data) is QueryDict:
            json_str = list(user_items_data.keys())[0]
            user_items_data = json.loads(json_str)

        print(user_items_data)

        ids = [item['id'] for item in user_items_data]
        for item in UserItem.objects.filter(user=user):
            if item.item.id not in ids:
                item.delete()

        for data in user_items_data:
            item = Item.objects.get(unity_id=data['id'])
            user_item = UserItem.objects.filter(user=user, item=item).first()
            if user_item is None:
                user_item = UserItem.objects.create(user=user, item=item, count=data['count'])
                user_item.save()

            else:
                user_item.count = data['count']
                user_item.save()

            if data['count'] <= 0:
                user_item.delete()

        user_info = UserInfo.objects.get(user=user)
        user_info.items.clear()
        for item in UserItem.objects.filter(user=user):
            user_info.items.add(item)

        return Response({'message': 'User items added'}, status=status.HTTP_200_OK)


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


class UserResultsListCreate(generics.ListCreateAPIView):
    queryset = UserResults.objects.all()
    serializer_class = UserResultsSerializer

    def post(self, request, *args, **kwargs):
        user_results_data = request.data

        if type(user_results_data) is QueryDict:
            json_str = list(user_results_data.keys())[0]
            user_results_data = json.loads(json_str)

        user_id = user_results_data['user_id']
        score = user_results_data['score']

        user = User.objects.get(id=user_id)
        user_info = UserInfo.objects.get(user=user)
        user_result = UserResults.objects.create(user=user, score=score)
        user_info.results.add(user_result)
        user_info.save()

        return Response({'message': 'User result added'}, status=status.HTTP_200_OK)
