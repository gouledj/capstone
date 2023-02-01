from rest_framework import serializers
from .models import Customer, Products, Cart, Types, Orders


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('customer_id', 'firstName', 'lastName', 'customerPhone',
                  'email', 'streetName', 'streetNumber','unit', 'postal_code', 'city','province',
                  'card_name', 'card_address', 'card_number', 'card_expire_date', 'cvc_number','orders', 'Cart'

                  )


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('product_id', 'product_name', 'product_description', 'product_quantity', 'product_price', 'product_price_sale', 'product_available',
                  'product_weight', 'product_height', 'product_weight', 'type_foreign_key')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ('order_id','order_time', 'orde_total', 'item_order_id')


# class CartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cart
#         fields = ('cart_id', 'items')


# class TypesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Types
#         fields = ('type_id', 'type_name')


# class CarTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CarType
#         fields = ('typeId', 'description', 'dailyCost', 'weeklyCost',
#                   'monthlyCost', 'lateFee', 'changeBranchFee')


