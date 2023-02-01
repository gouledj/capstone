# Generated by Django 4.1.3 on 2023-01-31 19:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_customer_card_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='Order_foreign_key',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.orders'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='cart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.cart'),
        ),
    ]
