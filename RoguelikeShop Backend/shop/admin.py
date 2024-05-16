from django.contrib import admin

from shop.models import Color, Rarity, Item, Skin, CartItem, Cart, Order, CartSkin

admin.site.register(Color)
admin.site.register(Rarity)
admin.site.register(Item)
admin.site.register(Skin)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(CartSkin)
