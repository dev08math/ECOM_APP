from functools import partial
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from ..serializers import CustomTokenSerializer, UserSerializer
from ..adminpermission import Isadmin

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

class getUserProfile(APIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            data = self.serializer_class(request.user).data
        except:
            return Response('Unable to Authenticate. The token might be expired', status=status.HTTP_401_UNAUTHORIZED) # this case is pure redundant
        return Response(data, status=status.HTTP_200_OK)

class registerUser(APIView):
    def post(self, request):
        data = request.data
        print(data)
        try:
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']),
                first_name = data['first_name'] if 'first_name' in data.keys() else " ",
                last_name = data['last_name'] if 'last_name' in data.keys() else " ",
            )
        except Exception as e:
            if str(e).find('already') != -1:
                return Response({'detail' : 'Username or Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'detail' : 'Unable to create a new user'}, status=status.HTTP_400_BAD_REQUEST)


        # CustomTokenSerializer is not able to get the access tokens. Hence using RefreshTokens for getting a new access token
        user_data = dict()
        user_data['token'] = str(RefreshToken.for_user(user).access_token)
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['email'] = user.email
        user_data['first_name'] = user.first_name
        user_data['last_name'] = user.last_name
        return Response(user_data, status=status.HTTP_200_OK)
  

class updateProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request):
        user = request.user
        if 'password' in  request.data.keys():
            user.password = make_password(request.data['password'])

        serializer = UserSerializer(instance=request.user,  data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class getUsers(APIView):
    permission_classes = [Isadmin]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

