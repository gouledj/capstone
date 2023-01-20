from rest_framework import serializers
from .models import Rental, Customer, Employee, CarType, Car, Branch


class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('rentalID', 'dateFrom', 'dateTo', 'dateReturned',
                  'totalCost', 'licensePlate', 'goldMember')


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('customerID', 'firstName', 'lastName', 'driversLicense', 'email', 'customerPhone', 'dob',
                  'goldMember', 'province', 'city', 'postalCode', 'streetNumber', 'streetName', 'unitNumber')


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('employeeID', 'firstName', 'lastName', 'email', 'employeePhone', 'password', 'salt', 'salary', 'dob',
                  'goldMember', 'province', 'city', 'postalCode', 'streetNumber', 'streetName', 'unitNumber')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('carID', 'manufacturer', 'model', 'fueldType',
                  'color', 'licensePlate', 'status', 'mileage')


class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('typeId', 'description', 'dailyCost', 'weeklyCost',
                  'monthlyCost', 'lateFee', 'changeBranchFee')


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('branchID', 'branchPhone', 'province', 'city',
                  'postalCode', 'streetNumber', 'streetName', 'unitNumber')
