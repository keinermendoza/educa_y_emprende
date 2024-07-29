from typing import Any
from django import forms
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.core.mail import send_mail
from celery import shared_task
import os
# from .task import (
#     send_feedback_email,
#     send_mail_to_owner
# )

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    best_email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)
    
    # trap fields
    username = forms.CharField(required=False)
    email = forms.CharField(required=False)
    
    def clean(self) -> dict[str, Any]:
        """
        checking fields for catch some bots
        """
        cleaned_data = super().clean()
        trap1 = cleaned_data.get("email")
        trap2 = cleaned_data.get("username")

        if trap1 or trap2:
            self.add_error("username", "stop the bot")
        return cleaned_data
    
    def send_email(self) -> None:
        """
        using celery task for send emails
        """
        email = self.cleaned_data.get("best_email")
        name = self.cleaned_data.get("name")
        message = self.cleaned_data.get("message")
        self.send_feedback_email(email, name, message)
        self.send_mail_to_owner(email, name, message)


    def send_feedback_email(self, email_address, name, message):
        """Sends an email when the feedback form has been submitted."""
        subject = "Gracias por entrar en Contacto"
        context = {
            'username':name,
            'message': message
        }
        html_message = render_to_string('core/mail/contact.html', context)

        message = EmailMessage(subject, html_message, os.getenv("EMAIL_FROM"), [email_address])
        message.content_subtype = 'html' # this is required because there is no plain text email message
        message.send()

    def send_mail_to_owner(self, email_address, name, message):
        self.send_mail(
            f"Recibiste un mensaje de {name}",
            f"Responder a: {email_address}\n\n{message}",
            os.getenv("EMAIL_FROM"),
            [os.getenv("EMAIL_OWNER")],
            fail_silently=False,
        )

