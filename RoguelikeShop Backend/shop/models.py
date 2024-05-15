from django.db import models


class Color(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название', null=False, blank=False)
    hex_code = models.CharField(max_length=9, verbose_name='HEX-код', null=False, blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Цвет'
        verbose_name_plural = 'Цвета'


class Rarity(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    color = models.ForeignKey(Color, on_delete=models.CASCADE, verbose_name='Цвет')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Редкость'
        verbose_name_plural = 'Редкости'


class Item(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    price = models.FloatField(verbose_name='Цена')
    rarity = models.ForeignKey(Rarity, on_delete=models.CASCADE, verbose_name='Редкость')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Предмет'
        verbose_name_plural = 'Предметы'


class Skin(Item):
    color = models.ForeignKey(Color, on_delete=models.CASCADE, verbose_name='Цвет')

    def __str__(self):
        return self.name + ' (' + self.color.name + ')'

    class Meta:
        verbose_name = 'Скин'
        verbose_name_plural = 'Скины'


class CartItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, verbose_name='Предмет')
    count = models.IntegerField(verbose_name='Количество')

    @property
    def price(self):
        return self.item.price * self.count

    def __str__(self):
        return str(self.count) + 'x ' + self.item.name

    class Meta:
        verbose_name = 'Предмет в корзине'
        verbose_name_plural = 'Предметы в корзине'


class Cart(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='Пользователь')
    items = models.ManyToManyField(CartItem, verbose_name='Предметы')

    @property
    def total_price(self):
        return sum([item.price for item in self.items.all()])

    @property
    def items_count(self):
        return sum([item.count for item in self.items.all()])

    def __str__(self):
        return 'Корзина №' + str(self.id) + ' (' + str(self.items_count) + ' товаров)'

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class Order(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='Пользователь')
    items = models.ManyToManyField(CartItem, verbose_name='Предметы')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    @property
    def total_price(self):
        return sum([item.price for item in self.items.all()])

    @property
    def items_count(self):
        return sum([item.count for item in self.items.all()])

    def __str__(self):
        return 'Заказ №' + str(self.id) + ' (' + str(self.items.count()) + ' товаров)'

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
