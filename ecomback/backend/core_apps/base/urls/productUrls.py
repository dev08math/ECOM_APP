from django.urls import path

from ..views.productViews import (
    getAllProducts,
    getAProduct,
    deleteProduct,
    updateProduct,
    createProduct,
)

urlpatterns = [
    path("", getAllProducts.as_view(), name="all-products"),
    path("<int:id>", getAProduct.as_view(), name="a-product"),

    path("create", createProduct.as_view(), name="create-product"),
    path("update/<int:id>", updateProduct.as_view(), name="create-product"),
    path("delete/<int:id>", deleteProduct.as_view(), name="delete-prod")

]
