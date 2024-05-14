from django import urls

from shop.views import ColorListAPIView, RarityListAPIView

urlpatterns = [
    urls.path('color/', ColorListAPIView.as_view(), name='color-list'),
    urls.path('rarity/', RarityListAPIView.as_view(), name='rarity-list'),
]
