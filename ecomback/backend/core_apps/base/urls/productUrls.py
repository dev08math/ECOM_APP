from django.urls import path

from ..views.productViews import getAllProducts, getAProduct

urlpatterns = [
    path("", getAllProducts.as_view(), name="all-products"),
    path("<int:id>", getAProduct.as_view(), name="a-product"),
]