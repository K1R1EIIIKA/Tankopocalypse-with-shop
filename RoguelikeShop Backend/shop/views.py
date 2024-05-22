from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from account.models import UserItem, UserSkin
from authentication.models import User
from .models import Color, Rarity, Item, Skin, CartItem, CartSkin, Order, Cart
from shop.serializer import ColorSerializer, RaritySerializer, ItemSerializer, SkinSerializer, CartItemSerializer, \
    CartSkinSerializer, CartSerializer, OrderSerializer


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


class CartSkinListCreate(generics.ListCreateAPIView):
    queryset = CartSkin.objects.all()
    serializer_class = CartSkinSerializer


class CartSkinRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartSkin.objects.all()
    serializer_class = CartSkinSerializer
    http_method_names = ['get', 'put', 'delete']


class CartDetail(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        queryset = Cart.objects.filter(user=user)
        if queryset.exists():
            return queryset.first()
        else:
            raise Http404("Cart not found")


class OrderListCreate(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


@method_decorator(csrf_exempt, name='dispatch')
class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        item_id = request.data.get('item_id')
        user_id = request.data.get('user_id')

        try:
            item = Item.objects.get(id=item_id)
            user = User.objects.get(id=user_id)
        except Item.DoesNotExist:
            return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        print(item, user)
        cart = Cart.objects.filter(user=user).first()
        print(cart)

        cart_item = CartItem.objects.filter(item=item, cart__user__cart=cart).first()
        print(cart_item)

        if cart_item:
            cart_item.count += 1
            cart_item.save()
        else:
            cart_item = CartItem.objects.create(item=item, count=1, cart=cart)
            cart.items.add(cart_item)
            cart.save()

        cart_item.save()

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        item_id = request.data.get('item_id')
        user_id = request.data.get('user_id')

        try:
            item = Item.objects.get(id=item_id)
            user = User.objects.get(id=user_id)
        except Item.DoesNotExist:
            return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        cart = Cart.objects.filter(user=user).first()
        cart_item = CartItem.objects.filter(item=item, cart=cart).first()

        if cart_item:
            cart_item.count -= 1
            cart_item.save()

            if cart_item.count == 0:
                cart.items.remove(cart_item)
                cart_item.delete()

        return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        cart = Cart.objects.filter(user=user).first()

        order = Order.objects.create(user=user)
        order.items.set(cart.items.all())
        order.skins.set(cart.skins.all())
        order.save()

        for item in cart.items.all():
            user_item = UserItem.objects.filter(user=user, item=item.item).first()
            if user_item:
                user_item.count += item.count
                user_item.save()
            else:
                UserItem.objects.create(user=user, item=item.item, count=item.count)

        for skin in cart.skins.all():
            user_skin = UserSkin.objects.filter(user=user, skin=skin.skin).first()
            if user_skin:
                user_skin.count += skin.count
                user_skin.save()
            else:
                UserSkin.objects.create(user=user, skin=skin.skin, count=skin.count)

        user_info = user.userinfo
        user_info.items.set(user.useritem_set.all())
        user_info.skins.set(user.userskin_set.all())

        cart.items.clear()
        cart.skins.clear()
        cart.save()

        return Response({'message': 'Order created'}, status=status.HTTP_200_OK)
