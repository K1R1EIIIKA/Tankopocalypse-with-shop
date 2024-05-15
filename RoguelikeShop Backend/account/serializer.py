from rest_framework import fields, serializers

from account.models import UserInfo, UserItem
from shop.models import Item
from shop.serializer import ItemSerializer


class UserItemSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), source='item', write_only=True,
                                                 required=False)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = UserItem
        fields = ('id', 'item', 'count', 'item_id', 'user')

    def create(self, validated_data):
        item_id = validated_data.pop('item_id', None)
        user_item = UserItem.objects.create(**validated_data)
        if item_id:
            user_item.item = item_id
            user_item.save()
        return user_item


class UserInfoSerializer(serializers.ModelSerializer):
    items = UserItemSerializer(many=True, read_only=True)
    items_json = serializers.JSONField(write_only=True)

    class Meta:
        model = UserInfo
        fields = ('id', 'user', 'balance', 'items', 'items_json')

    def create(self, validated_data):
        items_json = validated_data.pop('items_json', [])
        items_list = [item['id'] for item in items_json['items']]
        user_info = UserInfo.objects.create(**validated_data)
        for item_id in items_list:
            user_info.items.add(UserItem.objects.get(id=item_id))
        return user_info
