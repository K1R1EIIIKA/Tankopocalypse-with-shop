from django import urls

from shop.views import ColorListAPIView, RarityListAPIView, ItemListAPIView, SkinListAPIView, CartListAPIView, \
    OrderListAPIView, CartItemListAPIView

urlpatterns = [
    urls.path('color/', ColorListAPIView.as_view(), name='color-list'),
    urls.path('rarity/', RarityListAPIView.as_view(), name='rarity-list'),
    urls.path('item/', ItemListAPIView.as_view(), name='item-list'),
    urls.path('skin/', SkinListAPIView.as_view(), name='skin-list'),
    urls.path('cart-item/', CartItemListAPIView.as_view(), name='cart-item-list'),
    urls.path('cart/', CartListAPIView.as_view(), name='cart-list'),
    urls.path('order/', OrderListAPIView.as_view(), name='order-list'),
]
