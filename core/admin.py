from django.contrib import admin
from .models import (
    Curso,
    Category,
)

admin.site.register(Curso)

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    list_display = ['name' , 'category_parent_name']

    @admin.display(description="Categoría Padre")
    def category_parent_name(self, obj):
        if obj.parent:
            return obj.parent
        else:
            return '-'