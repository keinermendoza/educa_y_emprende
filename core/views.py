from django.shortcuts import render
from django.views.generic import (
    TemplateView
)
# Create your views here.
class HomeView(TemplateView):
    template_name = "core/pages/home.html"

class CursosView(TemplateView):
    template_name = "core/pages/cursos.html"

class CursoDetailView(TemplateView):
    template_name = "core/pages/curso_detail.html"

class SomeView(TemplateView):
    template_name = "core/partials/cursos/list.html"