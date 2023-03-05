from django.db import models

class Item_Orders(models.Model):
    item_order_id = models.AutoField(primary_key=True)
    item_order_quantity = models.IntegerField()
    item_order_price =models.FloatField()
class Types(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=50)


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    items = models.ManyToManyField('Products', related_name='carts')

class Orders(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_time = models.DateField()
    orde_total = models.IntegerField()

    # product_ordered = models.ForeignKey('Products', on_delete=models.CASCADE)


    # item_order_id = models.ForeignKey(Item_Orders, on_delete=models.CASCADE)
    item_order_id = models.ForeignKey('Products', on_delete=models.CASCADE)


class Customer(models.Model):
    #customer info
    customer_id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    customerPhone = models.IntegerField()
    email = models.CharField(max_length=50)
    streetName = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    unit = models.IntegerField()
    postal_code = models.CharField(max_length=8)
    city = models.CharField(max_length=60)
    province = models.CharField(max_length=60)
    country = models.CharField(max_length=60)

    card_name = models.CharField(max_length=60, blank=True)
    card_address = models.CharField(max_length=60, blank=True)
    card_number = models.IntegerField(max_length=17, default=1, blank=True)
    card_expire_date = models.DateField(blank=True)
    cvc_number =  models.IntegerField(max_length=4, blank=True)


    orders = models.ManyToManyField(Orders, related_name="Orders", blank=True)
    Cart = models.ManyToManyField(Cart, related_name="Cart", blank=True)

class Products(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=80)
    product_description = models.CharField(max_length=200)
    product_quantity = models.IntegerField()
    product_price = models.FloatField()
    product_price_sale = models.FloatField()
    product_available = models.BooleanField(default=True)
    product_weight = models.FloatField()
    product_height = models.FloatField()
    product_weight = models.FloatField()
    image = models.ImageField(upload_to='frontend/src/productimages', blank=True)

    type_foreign_key = models.ManyToManyField(Types, related_name="Types", blank=True )


