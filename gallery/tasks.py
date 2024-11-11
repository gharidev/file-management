import time

from celery import shared_task
from django.core.mail import send_mail


def send_welcome_mail_realtime():
    time.sleep(5)
    send_mail(
        "Welcome!",
        "Thanks for uploading a photo! This mail was send in realtime.",
        "from@example.com",
        ["to@example.com"],
        fail_silently=False,
    )


@shared_task
def send_welcome_email_async():
    time.sleep(5)
    send_mail(
        "Welcome!",
        "Thanks for uploading a photo! This mail was send asynchronously.",
        "from@example.com",
        ["to@example.com"],
        fail_silently=False,
    )
