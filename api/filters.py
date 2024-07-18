from django_filters import rest_framework as filters
from core.models import (
    Curso
)



class CursoFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')
    brand = filters.MultipleChoiceFilter(choices=Curso.Brands.choices)
    class Meta:
        model = Curso
        fields = ['title', 'brand']