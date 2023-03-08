# Generated by Django 4.1.3 on 2023-03-06 02:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('cart_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Item_Orders',
            fields=[
                ('item_order_id', models.AutoField(primary_key=True, serialize=False)),
                ('item_order_quantity', models.IntegerField()),
                ('item_order_price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Types',
            fields=[
                ('type_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=80)),
                ('product_description', models.CharField(max_length=200)),
                ('product_quantity', models.IntegerField()),
                ('product_price', models.FloatField()),
                ('product_price_sale', models.FloatField()),
                ('product_available', models.BooleanField(default=True)),
                ('product_height', models.FloatField()),
                ('product_weight', models.FloatField()),
                ('image', models.ImageField(blank=True, upload_to='frontend/src/productimages')),
                ('type_foreign_key', models.ManyToManyField(blank=True, related_name='Types', to='api.types')),
            ],
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('order_time', models.DateField()),
                ('orde_total', models.IntegerField()),
                ('item_order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.products')),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.AutoField(primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=100)),
                ('lastName', models.CharField(max_length=100)),
                ('customerPhone', models.IntegerField()),
                ('email', models.CharField(max_length=50)),
                ('streetName', models.CharField(max_length=20)),
                ('streetNumber', models.CharField(max_length=20)),
                ('postal_code', models.CharField(max_length=8)),
                ('city', models.CharField(max_length=60)),
                ('province', models.CharField(max_length=60)),
                ('country', models.CharField(max_length=60)),
                ('Cart', models.ManyToManyField(blank=True, related_name='Cart', to='api.cart')),
                ('orders', models.ManyToManyField(blank=True, related_name='Orders', to='api.orders')),
            ],
        ),
        migrations.AddField(
            model_name='cart',
            name='items',
            field=models.ManyToManyField(related_name='carts', to='api.products'),
        ),
    ]
