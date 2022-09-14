from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status

from ..serializers import ProductSerializer
from ..models import Product

from ..adminpermission import Isadmin

class getAllProducts(APIView):
    # have to update it with pagination
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

class createProduct(APIView):
    permission_classes = [Isadmin]
    def post(self, request):
        
        try:
            product = Product.objects.create(
            user=request.user,
            name='Enter Product Name',
            price=0,
            brand='Enter Brand Name',
            countInStock=0,
            category='Enter Category',
            description=''
            )
        except:
            return Response({'detail' : 'Unable to create a new product'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

class updateProduct(APIView):
    permission_classes = [Isadmin]
    def patch(self, request, id):
        data = request.data
        product = Product.objects.get(_id=id)

        serializer = ProductSerializer(instance=product, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
        else: return Response({'detail' : 'Unable to edit the product details. Kindly check and re do it.'})
        return Response(serializer.data, status=status.HTTP_200_OK)

class deleteProduct(APIView):
    permission_classes = [Isadmin]
    def delete(self, request, id):
        product = Product.objects.get(_id=id)
        product.delete()
        return Response("The product is now removed from the store.", status=status.HTTP_200_OK)


