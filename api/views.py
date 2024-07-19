from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination

from core.models import (
    Curso,
    Category
)
from .serializers import (
    CursoSerializer,
    CategorySerializer
)
from .filters import (
    CursoFilter,
    CategoryFilter
)

class CursosListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CursoSerializer
    queryset = Curso.objects.filter(is_public=True) 
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CursoFilter

    

class CategoriesListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = Category.objects.all()
        brand = self.request.query_params.getlist('brand', None)
        if brand:
            queryset = queryset.filter(cursos__brand__in=brand).distinct()
        return Response(queryset.values_list('name', flat=True))
        