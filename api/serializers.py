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

class TopicNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name']
    
class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class CursoEditorSerializer(serializers.ModelSerializer):
    # categories = CategoryNameSerializer(many=True, read_only=True)
    # topics = TopicNameSerializer(many=True, read_only=True)
    
    class Meta:
        model = Curso
        fields = '__all__'

class CursoDetailSerializer(serializers.ModelSerializer):
    categories = CategoryNameSerializer(many=True, read_only=True)
    topics = TopicNameSerializer(many=True, read_only=True)
    
    class Meta:
        model = Curso
        fields = '__all__'

class CursoPublicSerializer(serializers.ModelSerializer):
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
    