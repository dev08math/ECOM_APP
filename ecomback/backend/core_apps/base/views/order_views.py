from datetime import datetime

from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status, permissions

from ..models import Product, Order, ShippingAddress, OrderItems
from ..adminpermission import Isadmin
from ..serializers import OrderSerializer

class addOrderItems(APIView):
    def post(self, request):
        user = request.user
        data = request.data
        
        if 'orderItems' not in data.keys() : return Response({'detail' : 'No items in your order'}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=float(data['taxPrice']),
            shippingPrice=float(data['shippingPrice']),
            totalPrice=float(data['totalPrice'])
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in data['orderItems'] : 
            product = Product.objects.get(_id=i['_id'])

            item = OrderItems.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=int(i['qty']),
                price=float(i['price']),
                image=product.image.url,
            )

            product.countInStock -= item.qty
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    
class getMyOrders(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class getOrders(APIView):
    permission_classes = [Isadmin]
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
class getOrderById(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, id):
        user = request.user

        try:
            order = Order.objects.get(_id=id)
            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                Response({'detail': 'Not authorized to view this order'},
                        status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class updateToBePaid(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request, id):
        order = Order.objects.get(_id=id)

        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()

        return Response('Order was paid', status=status.HTTP_200_OK)

class updateToBeDelivered(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request, id):
        order = Order.objects.get(_id=id)

        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()

        return Response('Order was delivered', status=status.HTTP_200_OK)

