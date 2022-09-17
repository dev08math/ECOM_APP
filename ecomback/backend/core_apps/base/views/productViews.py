from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status, permissions

from ..serializers import ProductSerializer
from ..models import Product, Review


from ..adminpermission import Isadmin

class getAllProducts(APIView):
    # have to update it with pagination
    serializer_class = ProductSerializer

    def get(self, request):
        query = request.query_params.get('searchkey')
        if query == None:
            query = ''
  
        products = Product.objects.filter(name__icontains=query).order_by('-createdAt')

        serializer = self.serializer_class(products, many=True)
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
    serializer_class = ProductSerializer
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
        # print(product._id, " ", product.name)
        # print(data)
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

class getTopProducts(APIView):
    def get(self, request):
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class createProductReview(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, id):
        user = request.user
        product = Product.objects.get(_id=id)
        data = request.data

        alreadyExists = product.review_set.filter(user=user).exists()
        if alreadyExists:
            content = {'detail': 'Product already reviewed'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # 2 - No Rating or 0
        elif data['rating'] == 0:
            content = {'detail': 'Please select a rating'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        # 3 - Create review
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment'],
            )

            reviews = product.review_set.all()
            product.numReviews = len(reviews)

            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)
            product.save()

            return Response('Review Added', status=status.HTTP_200_OK)


