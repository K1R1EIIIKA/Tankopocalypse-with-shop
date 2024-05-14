from rest_framework import fields, serializers
from account.models import UserInfo, UserItem


class UserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserItem
        fields = ('id', 'item', 'count', 'price')


class UserInfoSerializer(serializers.ModelSerializer):
    items = UserItemSerializer(many=True)

    class Meta:
        model = UserInfo
        fields = ('id', 'user', 'balance', 'items')