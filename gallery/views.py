from django.shortcuts import render, redirect
from .forms import PhotoForm
from .models import Photo
from .tasks import send_welcome_email_async, send_welcome_mail_realtime


def gallery_view(request):
    photos = Photo.objects.order_by("-id")
    return render(request, "gallery/gallery.html", {"photos": photos})


def upload_photo(request):
    if request.method == "POST":
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            send_welcome_mail_realtime()
            return redirect("gallery")
    else:
        form = PhotoForm()
    return render(request, "gallery/upload.html", {"form": form})
