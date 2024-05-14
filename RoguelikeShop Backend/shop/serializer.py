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
