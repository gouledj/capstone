# Generated by Django 4.1.3 on 2023-02-23 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_alter_products_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='image',
            field=models.ImageField(upload_to='frontend/src/productimages'),
        ),
    ]