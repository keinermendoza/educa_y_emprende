from typing import Any
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import (
    TemplateView,
    DetailView,
    FormView
)
from django_htmx.http import trigger_client_event

from .models import (
    Curso,
    Category,
)
from .forms import (
    ContactForm
)
from .permissions import IsAdmin

class HomeView(TemplateView):
    template_name = "core/pages/home.html"

    def get_context_data(self, **kwargs) -> dict[str, Any]:
        context = super().get_context_data(**kwargs)
        context.update({
            'cursos': Curso.objects.filter(is_public=True)[:6]
        })  
        return context

class CursosView(TemplateView):  
    template_name = "core/pages/cursos.html"


class EditorView(IsAdmin, TemplateView):
    template_name = "core/pages/editor.html"


class CursoDetailView(DetailView):
    model = Curso
    context_object_name = 'curso'
    template_name = "core/pages/curso_detail.html"

class SomeView(TemplateView):
    template_name = "core/partials/cursos/list.html"

class ContactFormPartialView(FormView):
    form_class = ContactForm
    template_name = "core/partials/contact_form.html"

    def form_valid(self, form) -> HttpResponse:
        response = self.render_to_response({})
        return trigger_client_event(
            response,
            "display_toast",
            {
                "status":200,
                "message":"Email Enviado. Revisa la Bandeja de Entrada de tu Correo"
            }
        )
    
    def form_invalid(self, form) -> HttpResponse:
        response = super().form_invalid(form)
        return trigger_client_event(
            response,
            "display_toast",
            {
                "status":400,
                "message":"No fue posible enviar el mensaje"
            }
        )   

    def post(self, request, *args, **kwargs):
        """
        Sends Async Email
        """
        form = self.get_form()
        if form.is_valid():
            form.send_email()
            return self.form_valid(form)
        else:
            if "username" in form.errors:
                return self.form_valid(form)
            else:
                return self.form_invalid(form)
