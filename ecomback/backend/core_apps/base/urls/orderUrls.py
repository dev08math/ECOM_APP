from django.urls import path

from ..views.order_views import addOrderItems, getMyOrders, getOrders, getOrderById, updateToBeDelivered, updateToBePaid

urlpatterns = [
    path("", getOrders.as_view(), name="orders"),

    path("add", addOrderItems.as_view(), name="new-order"),
    
    path("myorders", getMyOrders.as_view(), name="my-order"),
    
    path("deliver/<int:id>", updateToBeDelivered.as_view(), name="delivered"),
    
    path("<int:id>", getOrderById.as_view(), name="order-id"),
    
    path("pay/<int:id>", updateToBePaid.as_view(), name="payment"),
]