# Generated by Django 5.0.6 on 2024-05-24 09:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_item_unity_id_skin_unity_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='unity_id',
        ),
        migrations.RemoveField(
            model_name='skin',
            name='unity_id',
        ),
    ]
