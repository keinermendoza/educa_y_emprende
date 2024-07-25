from django.db.models.functions import Lower
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from .pagination import PagPageNumberPaginationExtraParams

from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import FormParser, MultiPartParser 

from rest_framework.mixins import DestroyModelMixin
from rest_framework.generics import (
    ListCreateAPIView,
    ListAPIView,
    GenericAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    RetrieveAPIView
)
from core.models import (
    Curso,
    ImageCurso
)


from .serializers import (
    CursoEditorSerializer,
    CursoPublicSerializer,
    CursoDetailSerializer,
    ImageCursoSerializers,
    CategoryNameSerializer,
    TopicNameSerializer
)

from core.models import (
    Curso,
    Category,
    Topic
)

from .filters import (
    CursoFilter,
    CategoryFilter,
    TopicFilter
)

class CursosListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CursoPublicSerializer
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
    

class TopicsAPIView(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = TopicNameSerializer
    queryset = Topic.objects.all()
    pagination_class = None
    


class CategoriesAPIView(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CategoryNameSerializer
    queryset = Category.objects.all()
    pagination_class = None


class CursoUpdateAPIView(UpdateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CursoEditorSerializer
    queryset = Curso.objects.all()

class CursosListEditorAPIView(ListCreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = CursoEditorSerializer
    queryset = Curso.objects.all()

class CursoRetriveUpdateDestroy(RetrieveAPIView, DestroyModelMixin):
    permission_classes = [IsAdminUser]
    
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = CursoDetailSerializer
    queryset = Curso.objects.all()

class DeleteImage(APIView):
    permission_classes = [IsAdminUser]
    
    def delete(self, request, *args, **kwargs):
        image = get_object_or_404(ImageCurso, pk=kwargs.get('pk'))
        image.delete()
        return Response({'message': 'Eliminado con exito'}, status=status.HTTP_200_OK)


class UploadImage(GenericAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = ImageCursoSerializers
    queryset = ImageCurso.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        try:
            curso = Curso.objects.get(pk=pk)
        except Curso.DoesNotExist:
            return Response(
                {"message": "Curso no existe"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save(curso=curso)
        return Response(
            {
                "success": 1,
                "file": {
                    "url": image.image.url,
                    "id": image.id
                },
            }
        )
    