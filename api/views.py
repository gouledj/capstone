from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, viewsets
from .serializers import CustomerSerializer, ProductSerializer, OrderSerializer
from .models import Customer, Products, Orders
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status





# Create your views here.
def main(request):
    return HttpResponse("Hello")


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()


    # parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        qs = Products.objects.all()
        product_name = self.request.query_params.get('product_name')
        if product_name is not None:
            qs = qs.filter(product_name__icontains=product_name)
        min_price = self.request.query_params.get('product_price__gte')
        max_price = self.request.query_params.get('product_price__lte')
        if min_price is not None:
            qs = qs.filter(product_price__gte=min_price)
        if max_price is not None:
            qs = qs.filter(product_price__lte=max_price)
        return qs

       


        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = ProductSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)






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
