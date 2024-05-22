from rest_framework import serializers

from account.models import UserInfo, UserItem, Role, UserSkin


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class UserItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserItem
        fields = '__all__'


class UserSkinSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkin
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'
