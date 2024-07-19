from rest_framework import serializers
from core.models import (
    Curso,
    Category,
    # SubCategory
)

# class SubCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SubCategory
#         fields = ['name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

    def get_name(self, obj):
        return [category.name for category in obj.objects.all()]
    

class CursoSerializer(serializers.ModelSerializer):
    # categories = CategorySerializer(many=True, read_only=True)
    categories = serializers.SerializerMethodField()

    sub_categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model =  Curso
        fields = '__all__'

    def get_categories(self, obj):
        return [category.name for category in obj.categories.all()]
    