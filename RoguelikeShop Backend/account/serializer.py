from rest_framework import serializers

from account.models import UserInfo, UserItem, Role, UserSkin, UserResults


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


class UserResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResults
        fields = '__all__'
