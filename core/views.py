from typing import Any
from django.shortcuts import render
from django.views.generic import (
    TemplateView,
    DetailView,
    ListView
)
from .models import (
    Curso,
    Category,
    SubCategory
)

class HomeView(TemplateView):
    template_name = "core/pages/home.html"

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context.update({
            'cursos_personales': Curso.objects.filter(brand=Curso.Brands.PERSONAL),
            'cursos_profesionales': Curso.objects.filter(brand=Curso.Brands.PROFESIONAL)
        })  
        return context
    

class CursosView(ListView):
    queryset = Curso.objects.filter(is_public=True) 
    template_name = "core/pages/cursos.html"
    context_object_name = 'cursos'
    paginate_by = 6

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        print(context)
        return context


class CursoDetailView(DetailView):
    model = Curso
    context_object_name = 'curso'
    template_name = "core/pages/curso_detail.html"

class SomeView(TemplateView):
    template_name = "core/partials/cursos/list.html"