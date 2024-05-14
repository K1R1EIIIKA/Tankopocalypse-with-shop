from rest_framework import fields, serializers
from shop.models import Color, Rarity, Item, Skin, CartItem, Cart, Order


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'name')


class RaritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Rarity
        fields = ('id', 'name')


class ItemSerializer(serializers.ModelSerializer):
    rarity = RaritySerializer()

    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'rarity')


class SkinSerializer(serializers.ModelSerializer):
    color = ColorSerializer()

    class Meta:
        model = Skin
        fields = ('id', 'name', 'price', 'color')


class CartItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = CartItem
        fields = ('id', 'item', 'count')


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'total_price', 'items_count')


class OrderSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'items')

