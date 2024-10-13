from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.get_books,name='get-books'),
    path('create',views.create_books,name='create'),
    path('books/<int:pk>', views.book_detail, name='book_detail'),
]
