# Generated by Django 5.0.6 on 2024-05-24 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_alter_cartskin_count_alter_item_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='unity_id',
            field=models.IntegerField(default=1, verbose_name='ID в Unity'),
        ),
        migrations.AddField(
            model_name='skin',
            name='unity_id',
            field=models.IntegerField(default=1, verbose_name='ID в Unity'),
        ),
    ]
