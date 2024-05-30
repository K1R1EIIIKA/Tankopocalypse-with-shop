# Generated by Django 5.0.6 on 2024-05-30 11:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_userinfo_balance_alter_userinfo_items_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserResults',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0, verbose_name='Счет')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Результат пользователя',
                'verbose_name_plural': 'Результаты пользователей',
            },
        ),
        migrations.AddField(
            model_name='userinfo',
            name='results',
            field=models.ManyToManyField(blank=True, to='account.userresults', verbose_name='Результаты'),
        ),
    ]