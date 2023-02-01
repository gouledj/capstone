from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets

from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer
from .models import Customer, Products, Orders


# Create your views here.
def main(request):
    return HttpResponse("Hello")


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()


# class EmployeeView(viewsets.ModelViewSet):
#     serializer_class = EmployeeSerializer
#     queryset = Employee.objects.all()


# class CarView(viewsets.ModelViewSet):
#     serializer_class = CarSerializer
#     queryset = Car.objects.all()


# class CarTypeView(viewsets.ModelViewSet):
#     serializer_class = CarTypeSerializer
#     queryset = CarType.objects.all()


# class BranchView(viewsets.ModelViewSet):
#     serializer_class = BranchSerializer
#     queryset = Branch.objects.all()
