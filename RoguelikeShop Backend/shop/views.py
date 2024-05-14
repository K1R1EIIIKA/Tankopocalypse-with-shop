from rest_framework import generics

from shop.models import Item, Skin, Cart, Order, Color, Rarity, CartItem
from shop.serializer import ItemSerializer, SkinSerializer, CartSerializer, OrderSerializer, ColorSerializer, \
    RaritySerializer, CartItemSerializer


class ColorListAPIView(generics.ListCreateAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class RarityListAPIView(generics.ListCreateAPIView):
    queryset = Rarity.objects.all()
    serializer_class = RaritySerializer


class ItemListAPIView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class SkinListAPIView(generics.ListCreateAPIView):
    queryset = Skin.objects.all()
    serializer_class = SkinSerializer


class CartListAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderListAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CartItemListAPIView(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
