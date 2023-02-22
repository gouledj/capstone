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

    #card info
    card_name = models.CharField(max_length=60)
    #note for card field we'll just have one field where the user puts their card info in.
    card_address = models.CharField(max_length=60)
    card_number = models.IntegerField(max_length=17, default=1)
    card_expire_date = models.DateField()
    cvc_number =  models.IntegerField(max_length=4)

    orders = models.ManyToManyField(Orders, related_name="Orders", blank=True)
    Cart = models.ManyToManyField(Cart, related_name="Cart", blank=True)



    #Each  customer has a cart field that can dynamically change

    #good state  of database
    # Order_foreign_key = models.ForeignKey(Orders, on_delete=models.CASCADE, blank=True, null=True)
    # order_list = models.ManyToManyField(, related_name='carts')

    #This cart field will be treated as an object 
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)


class Products(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=80)
    product_description = models.CharField(max_length=200)
    product_quantity = models.IntegerField()
    product_price = models.FloatField()
    product_price_sale = models.FloatField()
    product_available = models.BooleanField()
    product_weight = models.FloatField()
    product_height = models.FloatField()
    product_weight = models.FloatField()
    image = models.ImageField(upload_to='post_images')

    type_foreign_key = models.ManyToManyField(Types, related_name="Types", blank=True )
    def __str__(self):
        return self.title

