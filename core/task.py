from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.core.mail import send_mail
from celery import shared_task
import os


@shared_task()
def send_feedback_email(email_address, name, message):
    """Sends an email when the feedback form has been submitted."""
    subject = "Gracias por entrar en Contacto"
    context = {
        'username':name,
        'message': message
    }
    html_message = render_to_string('core/mail/contact.html', context)

    message = EmailMessage(subject, html_message, os.getenv("EMAIL_HOST_USER"), [email_address])
    message.content_subtype = 'html' # this is required because there is no plain text email message
    message.send()

@shared_task()
def send_mail_to_owner(email_address, name, message):
    send_mail(
        f"Recibiste un mensaje de {name}",
        f"Responder a: {email_address}\n\n{message}",
        os.getenv("EMAIL_HOST_USER"),
        [os.getenv("EMAIL_OWNER")],
        fail_silently=False,
    )

