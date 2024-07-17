from django.db import models
from django.core.exceptions import ValidationError

class Category(models.Model):
    name = models.CharField('Nombre', max_length=150)
    parent = models.ForeignKey('self', verbose_name='Categoría Principal', on_delete=models.CASCADE, related_name='subcategories', null=True, blank=True)


    def clean(self):
        if self.parent and self.parent.parent:
            raise ValidationError("No se puede anidar más de un nivel.")
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"



class Curso(models.Model):
    class Brands(models.TextChoices):
        PERSONAL = ('per', 'Desarrollo Personal')
        PROFESIONAL = ('pro', 'Crecimiento Profesional')

    title = models.CharField('Nombre', max_length=150)
    price = models.DecimalField('Precio', max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField('Imagen Principal', null=True, blank=True)
    link = models.URLField('Link de Compra',  max_length=300, null=True, blank=True)
    is_public = models.BooleanField('Es Publico', default=False, help_text="Marca para que todos puedan ver este curso")
    brand = models.CharField('Motivación', max_length=3, choices=Brands.choices, default=Brands.PERSONAL)
    description = models.JSONField('Descripción', blank=True, null=True)
    # category = models.ForeignKey()

    def __str__(self):
        return self.title
    
