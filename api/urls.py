from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views
app_name = 'api'
urlpatterns = [
    path('filter/cursos', views.CursosListAPIView.as_view(), name='cursos_list' ),
    path('filter/categories', views.CategoriesAPIView.as_view(), name='categories_list' ),
    path('filter/topics', views.TopicsAPIView.as_view(), name='topics_list' ),



    path('cursos', views.CursosList.as_view(), name='cursos_list'),
    path('cursos/<int:pk>/', views.CursoRetriveUpdateDestroy.as_view(), name='cursos_detail'),
    path("cursos/<int:pk>/image/upload/", views.UploadImage.as_view(), name="upload_image"),
    path("cursos/<int:pk>/image/delete/", views.DeleteImage.as_view(), name="delete_image")



]