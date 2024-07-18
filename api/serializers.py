from rest_framework import serializers
from core.models import (
    Curso,
    Category,
    SubCategory
)

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Curso
        fields = '__all__'