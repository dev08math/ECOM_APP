from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Order, OrderItems, Product, ShippingAddress

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    def get_fullname(self, obj):
        # print("fullname ", obj.first_name," ", obj.last_name)
        first_name = obj.first_name
        last_name = obj.last_name
        return f"{first_name} {last_name}"

    def get_isAdmin(self, obj):
        return  obj.is_superuser

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'fullname', 'isAdmin']

class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # AddIing custom claims
        userData = UserSerializer(self.user).data
        for i in userData.items():
            data[i[0]] = i[1]

        return data

      
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        # returns all the order items associated with the order
        items = obj.orderitems_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    