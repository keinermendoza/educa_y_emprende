from django.db.models.functions import Lower
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from .pagination import PagPageNumberPaginationExtraParams

from core.models import (
    Curso,
    Category,
    Topic
)
from .serializers import (
    CursoSerializer,
    CategorySerializer,
)
from .filters import (
    CursoFilter,
    CategoryFilter,
    TopicFilter
)

class CursosListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CursoSerializer
    queryset = Curso.objects.filter(is_public=True) 
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = CursoFilter
    # paginator = None

    def get_paginated_response(self, data, **kwargs):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data, **kwargs) # passing extra data
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # extra data
        # topics = sorted(set(Topic.objects.filter(id__in=queryset.values_list('topics', flat=True)).values_list('name', flat=True)))
        # categories = sorted(set(Category.objects.filter(id__in=queryset.values_list('categories', flat=True)).values_list('name', flat=True)))
        categories = Category.objects.annotate(lower_name=Lower('name')).values_list('name', flat=True).order_by('lower_name')
        brands = sorted(set(queryset.values_list('brand', flat=True)))
        topics = Topic.objects.annotate(lower_name=Lower('name')).values_list('name', flat=True).order_by('lower_name')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data, categories=categories, topics=topics, brands=brands)

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'cursos':serializer.data,
            'extra': {
                'categories':categories,
                'topics':topics,
                'brands':brands
            }
            })
    

class TopicsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = Topic.objects.all()
        queryset = TopicFilter(self.request.GET, queryset=queryset)
        print(queryset.qs)
        # brand = self.request.query_params.getlist('brand', None)
        # print(brand)
        # if brand:
        #     queryset = queryset.filter(cursos__brand__in=brand).distinct()
        
        # categories = self.request.query_params.getlist('categories', None)
        # if categories:
        #     queryset = queryset.filter(cursos__categories__name__in=categories).distinct()
        
        return Response(queryset.qs.values_list('name', flat=True))


class CategoriesAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = Category.objects.all()
        brand = self.request.query_params.getlist('brand', None)
        if brand:
            queryset = queryset.filter(cursos__brand__in=brand).distinct()
        return Response(queryset.values_list('name', flat=True))
        