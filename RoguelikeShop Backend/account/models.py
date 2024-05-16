from django.db import models

from shop.models import Item, Skin


class Role(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название')
    name_ru = models.CharField(max_length=50, verbose_name='Название (рус.)')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'


class UserItem(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='Пользователь')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, verbose_name='Предмет')
    count = models.IntegerField(verbose_name='Количество')

    @property
    def price(self):
        return self.item.price * self.count

    def __str__(self):
        return str(self.count) + 'x ' + self.item.name

    class Meta:
        verbose_name = 'Предмет пользователя'
        verbose_name_plural = 'Предметы пользователей'


class UserSkin(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='Пользователь')
    skin = models.ForeignKey(Skin, on_delete=models.CASCADE, verbose_name='Скин')
    count = models.IntegerField(verbose_name='Количество')

    @property
    def price(self):
        return self.skin.price * self.count

    def __str__(self):
        return str(self.count) + 'x ' + self.skin.name

    class Meta:
        verbose_name = 'Скин пользователя'
        verbose_name_plural = 'Скины пользователей'


class UserInfo(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, verbose_name='Пользователь')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, verbose_name='Роль', null=True)
    balance = models.FloatField(default=0, verbose_name='Баланс')
    items = models.ManyToManyField(UserItem, verbose_name='Предметы')

    def __str__(self):
        return self.user.username + ' (' + str(self.balance) + ')'

    class Meta:
        verbose_name = 'Информация о пользователе'
        verbose_name_plural = 'Информация о пользователях'
