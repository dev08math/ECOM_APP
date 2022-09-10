from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def upload_to(instance, filename):
    filename = str(instance._id) + '__' + filename
    return 'product_images/{filename}'.format(filename=filename)

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # preserving data of the  product if the user deletes the account

    name = models.CharField(max_length=200, null=True, blank=True)

    image = models.ImageField(null=True, blank=True, default='/placeholder.jpg', upload_to = upload_to) 

    brand = models.CharField(max_length=200, null=True, blank=True)

    category = models.CharField(max_length=200, null=True, blank=True)

    description = models.TextField(null=True, blank=True)

    rating = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)

    numReviews = models.IntegerField(null=True, blank=True, default=0)

    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)

    countInStock = models.IntegerField(null=True, blank=True, default=0)

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Products'
    
    def get_Prod_details(self):
        return f'_ID IS -> {self._id}'


class Review(models.Model): # stores multiple reviews made by multiple user on a product
    # a product can have multiple reviews by a user
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    # a user can add multiple reviews
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)

    rating = models.IntegerField(null=True, blank=True, default=0)

    comment = models.TextField(null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return f'{self.name} rated by {self.user.username} on {self.createdAt}'
    
    class Meta:
        verbose_name_plural = 'Reviews'


class Order(models.Model):  # stores the details perataining to an order
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    paymentMethod = models.CharField(max_length=200, null=True, blank=True)

    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    isPaid = models.BooleanField(default=False)

    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)

    isDelivered = models.BooleanField(default=False)

    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)

    createdAt = models.DateTimeField(auto_now_add=True)

    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return f'Order id -> {self._id} made by user -> {self.user.username}'


class OrderItems(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)

    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)

    name = models.CharField(max_length=200, null=True, blank=True)

    qty = models.IntegerField(null=True, blank=True, default=0)

    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)

    image = models.CharField(max_length=200, null=True, blank=True) 

    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):

    order = models.OneToOneField(Order, on_delete=models.CASCADE)

    address = models.CharField(max_length=200, null=True, blank=True)

    city = models.CharField(max_length=200, null=True, blank=True)

    postalCode = models.CharField(max_length=200, null=True, blank=True)

    country = models.CharField(max_length=200, null=True, blank=True)

    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)

    _id = models.BigAutoField(primary_key=True, editable=False)

    def __str__(self):
        return f'Order id -> {self.order._id} being shipped to {self.address} - {self.postalCode} [{self._id}] '

