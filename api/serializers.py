from rest_framework import serializers
from core.models import (
    Curso,
    Category,
    SubCategory
)

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class CursoSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    sub_categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model =  Curso
        fields = '__all__'

    