from django.shortcuts import render
from rest_framework.generics import ListAPIView 
from rest_framework.permissions import AllowAny
from core.models import (
    Curso
)
from .serializers import (
    CursoSerializer
)
class CursosListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CursoSerializer
    queryset = Curso.objects.filter(is_public=True) 