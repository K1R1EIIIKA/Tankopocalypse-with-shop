from rest_framework import generics

from shop.models import Item, Skin, Cart, Order, Color, Rarity, CartItem
from shop.serializer import ItemSerializer, SkinSerializer, CartSerializer, OrderSerializer, ColorSerializer, RaritySerializer, CartItemSerializer


class ColorListAPIView(generics.ListCreateAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class RarityListAPIView(generics.ListCreateAPIView):
    queryset = Rarity.objects.all()
    serializer_class = RaritySerializer
