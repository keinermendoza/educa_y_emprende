from django_filters import rest_framework as filters
from core.models import (
    Curso,
    Category
)

class CategoryFilter(filters.FilterSet):
    brand = filters.CharFilter(field_name='cursos__brand')
    class Meta:
        model = Category
        fields = ['brand']

class CursoFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')
    brand = filters.MultipleChoiceFilter(choices=Curso.Brands.choices)
    class Meta:
        model = Curso
        fields = ['title', 'brand']