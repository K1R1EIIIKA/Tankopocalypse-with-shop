# Generated by Django 5.0.6 on 2024-05-16 10:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='skin',
            name='only_one',
            field=models.BooleanField(default=False, verbose_name='Только один'),
        ),
        migrations.CreateModel(
            name='CartSkin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(verbose_name='Количество')),
                ('skin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.skin', verbose_name='Скин')),
            ],
            options={
                'verbose_name': 'Скин в корзине',
                'verbose_name_plural': 'Скины в корзине',
            },
        ),
    ]
