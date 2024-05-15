from datetime import datetime

from rest_framework import fields, serializers
from shop.models import Color, Rarity, Item, Skin, CartItem, Cart, Order


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'name', 'hex_code')


class RaritySerializer(serializers.ModelSerializer):
    color_id = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all(), source='color', write_only=True,
                                                  required=False)
    color = ColorSerializer(read_only=True)

    class Meta:
        model = Rarity
        fields = ('id', 'name', 'color_id', 'color')

    def create(self, validated_data):
        color_id = validated_data.pop('color_id', None)
        rarity = Rarity.objects.create(**validated_data)
        if color_id:
            rarity.color = color_id
            rarity.save()
        return rarity


class ItemSerializer(serializers.ModelSerializer):
    rarity_id = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all(), source='rarity', write_only=True,
                                                   required=False)
    rarity = RaritySerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'price', 'rarity', 'rarity_id')

    def create(self, validated_data):
        rarity_id = validated_data.pop('rarity_id', None)
        item = Item.objects.create(**validated_data)
        if rarity_id:
            item.rarity = rarity_id
            item.save()
        return item


class SkinSerializer(serializers.ModelSerializer):
    color_id = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all(), source='color', write_only=True,
                                                  required=False)
    color = ColorSerializer(read_only=True)
    rarity_id = serializers.PrimaryKeyRelatedField(queryset=Rarity.objects.all(), source='rarity', write_only=True,
                                                   required=False)
    rarity = RaritySerializer(read_only=True)

    class Meta:
        model = Skin
        fields = ('id', 'name', 'description', 'price', 'rarity', 'rarity_id', 'color', 'color_id')

    def create(self, validated_data):
        color_id = validated_data.pop('color_id', None)
        skin = Skin.objects.create(**validated_data)
        if color_id:
            skin.color = color_id
            skin.save()
        return skin


class CartItemSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), source='item', write_only=True,
                                                 required=False)
    item = ItemSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'item', 'count', 'item_id')

    def create(self, validated_data):
        item_id = validated_data.pop('item_id', None)
        cart_item = CartItem.objects.create(**validated_data)
        if item_id:
            cart_item.item = item_id
            cart_item.save()
        return cart_item


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    items_json = serializers.JSONField(write_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'items_json', 'total_price', 'items_count')

    def create(self, validated_data):
        items_json = validated_data.pop('items_json', [])
        items_list = [item['id'] for item in items_json['items']]
        cart = Cart.objects.create(**validated_data)
        for item_id in items_list:
            cart.items.add(CartItem.objects.get(id=item_id))
        return cart


class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    items_json = serializers.JSONField(write_only=True)
    created_at = fields.DateTimeField(read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'items', 'items_json', 'total_price', 'items_count', 'created_at')

    def create(self, validated_data):
        items_json = validated_data.pop('items_json', [])
        items_list = [item['id'] for item in items_json['items']]
        order = Order.objects.create(**validated_data)
        order.created_at = datetime.now()
        for item_id in items_list:
            order.items.add(CartItem.objects.get(id=item_id))
        return order
