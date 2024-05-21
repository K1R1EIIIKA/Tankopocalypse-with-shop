from rest_framework import generics
from rest_framework.response import Response

from authentication.models import User
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


def add_to_cart(request):
    if request.method == 'POST':
        item_id = request.data['item_id']
        user_id = request.data['user_id']
        item = Item.objects.get(id=item_id)
        user = User.objects.get(id=user_id)
        cart_item = CartItem.objects.create(item=item, user=user)
        cart_item.save()
        return Response({'message': 'Item added to cart'})
    else:
        return Response({'message': 'Method not allowed'})
