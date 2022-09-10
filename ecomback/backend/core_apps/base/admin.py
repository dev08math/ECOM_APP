from django.contrib import admin

from .models import Product, Order, Review, ShippingAddress

class ProductAdmin(admin.ModelAdmin):
     list_display = ["__str__", "get_Prod_details"]

admin.site.register(Product, ProductAdmin)

admin.site.register(Order)

admin.site.register(Review)

admin.site.register(ShippingAddress)
