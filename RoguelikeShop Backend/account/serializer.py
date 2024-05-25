from rest_framework import serializers

from account.models import UserInfo, UserItem, Role, UserSkin


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class UserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserItem
        fields = ['id', 'user', 'item', 'count', 'price', 'unity_id']


class UserSkinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkin
        fields = ['id', 'user', 'skin', 'count', 'price', 'unity_id']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'
