from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status


# from .products_list import products
from ..serializers import ProductSerializer
from ..models import Product

class getAllProducts(APIView):
    serializer_class = ProductSerializer
    products = Product.objects.all()

    def get(self, reuquest):
        serializer = self.serializer_class(self.products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getAProduct(APIView):
    serializer_class = ProductSerializer
    def get(self, request, id):
        try:
            product  = Product.objects.get(_id=id)
        except Product.DoesNotExist:
            raise NotFound("Cannot find any article as requested.")
            
        serializer = self.serializer_class(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

