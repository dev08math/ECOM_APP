from ast import increment_lineno
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", include('core_apps.base.urls.productUrls')),
    path("api/users/", include('core_apps.base.urls.userUrls')),
    path("api/orders/", include('core_apps.base.urls.orderUrls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
