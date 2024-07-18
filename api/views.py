from django.shortcuts import render
from rest_framework.generics import ListAPIView 
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination

from core.models import (
    Curso
)
from .serializers import (
    CursoSerializer
)
from .filters import (
    CursoFilter
)
class CursosListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CursoSerializer
    queryset = Curso.objects.filter(is_public=True) 
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CursoFilter

    def get_queryset(self):
        return super().get_queryset()
    