from django.contrib import admin
from .models import (
    Curso,
    Category,
    SubCategory,
)
@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ['title', 'brand' ,'slug', 'price', 'is_public']
    filter_horizontal = ['categories', 'sub_categories']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name' , 'subcategories_count']

    @admin.display(description="N Subcategorías")
    def subcategories_count(self, obj):
        if obj.subcategories:
            return obj.subcategories.count()
        else:
            return '-'
        
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent_category']

    @admin.display(description="Categroía Padre")
    def parent_category(self, obj):
        if obj.parent:
            return obj.parent
        else:
            return '-'