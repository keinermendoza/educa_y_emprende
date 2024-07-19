from django.urls import path
from django.views.generic import TemplateView
from . import views
app_name = 'api'
urlpatterns = [
    path('filter/cursos', views.CursosListAPIView.as_view(), name='cursos_list' ),
    path('filter/categories', views.CategoriesListAPIView.as_view(), name='categories_list' ),


]