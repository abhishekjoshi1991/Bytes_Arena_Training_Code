from django.shortcuts import render
import json
from rest_framework.views import APIView
from .models import Income, IncomeCategory, ExpenseCategory, Expense
from .serializers import IncomeCategorySerializer, ExpenseCategorySerializer
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
class IncomeCategoryView(APIView):
    def get(self, request, pk=None):
        output = {}
        income_category = IncomeCategory.objects.all()
        serializer = IncomeCategorySerializer(income_category, many=True)
        res = JsonResponse(serializer.data, safe=False)
        output['data'] = json.loads(res.content)
        headers = {'Access-Control-Allow-Origin': "*", 'Accept': '*/*'}
        return Response(output, headers=headers)
        # return Response(serializer.data)


class ExpenseCategoryView(APIView):
    def get(self, request, pk=None):
        expense_category = ExpenseCategory.objects.all()
        serializer = ExpenseCategorySerializer(expense_category, many=True)
        return Response(serializer.data)
