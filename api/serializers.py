from rest_framework import serializers
from core.models import (
    Curso,
    Category,
    Topic,
    ImageCurso

    # SubCategory
)

from core.models import (
    Curso,
)

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class CursoTitleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'title']

         
class ImageCursoSerializers(serializers.ModelSerializer):
    class Meta:
        model = ImageCurso
        fields = ['image']

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['name']
        
    def get_name(self, obj):
        return [topic.name for topic in obj.objects.all()]
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

    def get_name(self, obj):
        return [category.name for category in obj.objects.all()]
    

class CursoSerializer(serializers.ModelSerializer):
    # categories = CategorySerializer(many=True, read_only=True)
    categories = serializers.SerializerMethodField()
    topics = serializers.SerializerMethodField()

    href = serializers.SerializerMethodField()
    
    class Meta:
        model =  Curso
        fields = '__all__'

    def get_href(self, obj):
        return obj.get_absolute_url()


    def get_categories(self, obj):
        return [category.name for category in obj.categories.all()]
    
    def get_topics(self, obj):
        return [topic.name for topic in obj.topics.all()]
    