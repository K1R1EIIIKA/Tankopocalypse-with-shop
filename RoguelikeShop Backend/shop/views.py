from rest_framework import generics
from .models import Color, Rarity, Item, Skin, CartItem
from shop.serializer import ColorSerializer, RaritySerializer, ItemSerializer, SkinSerializer, CartItemSerializer


class ColorListCreate(generics.ListCreateAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class ColorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    http_method_names = ['get', 'put', 'delete']


class RarityListCreate(generics.ListCreateAPIView):
    queryset = Rarity.objects.all()
    serializer_class = RaritySerializer


class RarityRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rarity.objects.all()
    serializer_class = RaritySerializer
    http_method_names = ['get', 'put', 'delete']


class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    http_method_names = ['get', 'put', 'delete']


class SkinListCreate(generics.ListCreateAPIView):
    queryset = Skin.objects.all()
    serializer_class = SkinSerializer


class SkinRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skin.objects.all()
    serializer_class = SkinSerializer
    http_method_names = ['get', 'put', 'delete']


class CartItemListCreate(generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class CartItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    http_method_names = ['get', 'put', 'delete']
