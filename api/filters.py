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
    categories = filters.ModelMultipleChoiceFilter(
        queryset=Category.objects.all(),
        field_name='categories__name',
        to_field_name='name'
    )
    # categories = filters.MultipleChoiceFilter(field_name='categories__name')

    class Meta:
        model = Curso
        fields = ['title', 'brand', 'categories']