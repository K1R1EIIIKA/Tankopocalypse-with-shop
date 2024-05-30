from django.db import models
from django.contrib.auth.models import AbstractUser

from authentication.models import User
from shop.models import Skin, Item


class Role(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    name_ru = models.CharField(max_length=50, verbose_name='Название (рус.)')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'


class UserItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, verbose_name='Предмет')
    count = models.IntegerField(verbose_name='Количество', default=1)

    @property
    def price(self):
        return self.item.price * self.count

    @property
    def unity_id(self):
        return self.item.unity_id

    def __str__(self):
        return str(self.count) + 'x ' + self.item.name

    class Meta:
        verbose_name = 'Предмет пользователя'
        verbose_name_plural = 'Предметы пользователей'


class UserSkin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    skin = models.ForeignKey(Skin, on_delete=models.CASCADE, verbose_name='Скин')
    count = models.IntegerField(verbose_name='Количество', default=1)

    @property
    def price(self):
        return self.skin.price * self.count

    @property
    def unity_id(self):
        return self.skin.unity_id

    def __str__(self):
        return str(self.count) + 'x ' + self.skin.name

    class Meta:
        verbose_name = 'Скин пользователя'
        verbose_name_plural = 'Скины пользователей'


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, verbose_name='Роль', null=True)
    balance = models.DecimalField(default=0, verbose_name='Баланс', max_digits=10, decimal_places=2)
    items = models.ManyToManyField(UserItem, verbose_name='Предметы', blank=True)
    skins = models.ManyToManyField(UserSkin, verbose_name='Скины', blank=True)
    results = models.ManyToManyField('UserResults', verbose_name='Результаты', blank=True)

    def __str__(self):
        return self.user.name + ' - ' + str(self.balance) + ' руб.'

    class Meta:
        verbose_name = 'Информация о пользователе'
        verbose_name_plural = 'Информация о пользователях'


class UserResults(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    score = models.IntegerField(verbose_name='Счет', default=0)

    def __str__(self):
        return self.user.name + ' - ' + str(self.score) + ' очков'

    class Meta:
        verbose_name = 'Результат пользователя'
        verbose_name_plural = 'Результаты пользователей'
