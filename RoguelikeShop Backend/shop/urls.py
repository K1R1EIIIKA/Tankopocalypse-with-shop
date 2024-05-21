from django.urls import path

from .views import *

urlpatterns = [
    path('colors/', ColorListCreate.as_view(), name='color-list'),
    path('colors/<int:pk>/', ColorRetrieveUpdateDestroy.as_view(), name='color-detail'),
    path('rarities/', RarityListCreate.as_view(), name='rarity-list'),
    path('rarities/<int:pk>/', RarityRetrieveUpdateDestroy.as_view(), name='rarity-detail'),
    path('items/', ItemListCreate.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroy.as_view(), name='item-detail'),
    path('skins/', SkinListCreate.as_view(), name='skin-list'),
    path('skins/<int:pk>/', SkinRetrieveUpdateDestroy.as_view(), name='skin-detail'),
    path('cart-items/', CartItemListCreate.as_view(), name='cart-item-list'),
    path('cart-items/<int:pk>/', CartItemRetrieveUpdateDestroy.as_view(), name='cart-item-detail'),
    path('cart-skins/', CartSkinListCreate.as_view(), name='cart-skin-list'),
    path('cart-skins/<int:pk>/', CartSkinRetrieveUpdateDestroy.as_view(), name='cart-skin-detail'),
    path('cart/', CartDetail.as_view(), name='cart-detail'),
    path('order/', OrderListCreate.as_view(), name='order-list'),
]
