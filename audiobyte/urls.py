from django.contrib import admin
from django.urls import path
from .views import home,suggestions,recommendations,get_song
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',home),
    path('suggestions/',suggestions),
    path('recommendations/',recommendations),
    path('get_song/',get_song),
    
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)