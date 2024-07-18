import django_filters
from .models import (
    Curso
)

class CursoFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    brand__name = django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = Curso
        fields = ['title', 'brand__name']