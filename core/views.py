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
    # SubCategory
)

from .permissions import IsAdmin

# from ..api.filters import CursoFilter

class HomeView(TemplateView):
    template_name = "core/pages/home.html"

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context.update({
            'cursos_personales': Curso.objects.filter(brand=Curso.Brands.PERSONAL),
            'cursos_profesionales': Curso.objects.filter(brand=Curso.Brands.PROFESIONAL)
        })  
        return context

class CursosView(TemplateView):  
    template_name = "core/pages/cursos.html"


class EditorView(IsAdmin, TemplateView):
    template_name = "core/pages/editor.html"


# class CursosView(ListView):
#     queryset = Curso.objects.filter(is_public=True) 
#     template_name = "core/pages/cursos.html"
#     context_object_name = 'cursos'
#     paginate_by = 6

#     # custom atributes
#     # filter_class = CursoFilter
#     partial_template_name = 'cotton/partials/curso/list.html'

#     def get_template_names(self) -> list[str]:
#         if self.request.htmx:
#             return [self.partial_template_name]
#         return super().get_template_names()

#     def get_context_data(self, **kwargs) -> dict[str, Any]:
#         context = super().get_context_data(**kwargs)
#         print(context)
#         return context
    
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         return self.filter_queryset(queryset)
    
#     def filter_queryset(self, queryset):
#         filter = self.filter_class(self.request.GET, queryset)
#         return filter.qs



class CursoDetailView(DetailView):
    model = Curso
    context_object_name = 'curso'
    template_name = "core/pages/curso_detail.html"

class SomeView(TemplateView):
    template_name = "core/partials/cursos/list.html"