from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Book
from .serializer import BookSerializer


# Create your views here.

@api_view(['GET'])
def get_books(request):
    Books=Book.objects.all()
    serializedData=BookSerializer(Books,many=True)
    return Response(serializedData.data)

@api_view(['POST'])
def create_books(request):
    serializers=BookSerializer(data=request.data)

    if serializers.is_valid():
        serializers.save()
        return Response({"message":serializers.data})
    return Response({"errors":serializers.errors})

@api_view(['PUT', 'DELETE'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response()

    if request.method == 'DELETE':
        book.delete()
        return Response()
    elif request.method == 'PUT':
        data = request.data
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors)