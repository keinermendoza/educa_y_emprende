from django.urls import path, re_path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('cursos', views.CursosView.as_view(), name='cursos'),
    path('cursos/<slug:slug>', views.CursoDetailView.as_view(), name='curso_detail'),
    path("contacto", views.ContactFormPartialView.as_view(), name="contacto"),

    re_path(r'^editor/.*$', views.EditorView.as_view(), name='editor'),


    path('some', views.SomeView.as_view(), name='some'),


]
