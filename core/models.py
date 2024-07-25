from django.urls import reverse
from django.db import models
from django.core.exceptions import ValidationError
from django_extensions.db.fields import AutoSlugField



class Category(models.Model):
    name = models.CharField('Nombre', max_length=150)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

class Topic(models.Model):
    name = models.CharField('Nombre', max_length=150)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Tema"
        verbose_name_plural = "Temas"


class Curso(models.Model):
    class Brands(models.TextChoices):
        PERSONAL = ('per', 'Desarrollo Personal')
        PROFESIONAL = ('pro', 'Crecimiento Profesional')

    title = models.CharField('Nombre', max_length=150)
    slug = AutoSlugField(populate_from=['title'])

    price = models.DecimalField('Precio', max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField('Imagen Principal', null=True, blank=True)
    link = models.URLField('Link de Compra',  max_length=300, null=True, blank=True)
    is_public = models.BooleanField('Es Publico', default=False, help_text="Marca para que todos puedan ver este curso")
    brand = models.CharField('Motivación', max_length=3, choices=Brands.choices, default=Brands.PERSONAL)
    summary = models.CharField('Resumen', max_length=152, blank=True, null=True)
    description = models.JSONField('Descripción', blank=True, null=True)
    categories = models.ManyToManyField(Category, verbose_name='Categoría', related_name='cursos')
    topics = models.ManyToManyField(Topic, verbose_name='Temas', related_name='cursos', blank=True, null=True)

    created = models.DateTimeField('Fecha de Creación', auto_now_add=True)
    updated = models.DateTimeField('Última Actualización',auto_now=True)


    def get_absolute_url(self):
        return reverse("core:curso_detail", args=[self.slug])
    

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    class Meta:
        indexes = [
            models.Index(fields=['-created'])
        ]
        ordering = ["-created"]


class ImageCurso(models.Model):
    curso = models.ForeignKey(
        Curso,
        on_delete=models.CASCADE,
        related_name="images_curso",
    )
    image = models.ImageField(upload_to="cursos_images")


    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)

    
