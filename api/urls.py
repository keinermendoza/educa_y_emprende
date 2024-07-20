from django.urls import path
from django.views.generic import TemplateView
from . import views
app_name = 'api'
urlpatterns = [
    path('filter/cursos', views.CursosListAPIView.as_view(), name='cursos_list' ),
    path('filter/categories', views.CategoriesAPIView.as_view(), name='categories_list' ),
    path('filter/topics', views.TopicsAPIView.as_view(), name='topics_list' ),



]