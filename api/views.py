from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets

from .serializers import RentalSerializer, CustomerSerializer, EmployeeSerializer, CarSerializer, CarTypeSerializer, BranchSerializer
from .models import Rental, Customer, Employee, Car, CarType, Branch


# Create your views here.
def main(request):
    return HttpResponse("Hello")


class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()


class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()
