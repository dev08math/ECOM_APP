from django.urls import path

from ..views.userViews import CustomTokenObtainPairView, getUserProfile, getUsers, updateProfile, registerUser


urlpatterns = [
    path('', getUsers.as_view(), name='get_all_users'),
    path('profile', getUserProfile.as_view(), name="user_profile"),

    path('profile/update', updateProfile.as_view(), name="update"),
    path('register', registerUser.as_view(), name='register'),

    path('login', CustomTokenObtainPairView.as_view(), name='obtain_jwt_pair'),
]