# Generated by Django 5.0.7 on 2024-07-19 21:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_remove_subcategory_parent'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SubCategory',
            new_name='Topic',
        ),
        migrations.RemoveField(
            model_name='curso',
            name='sub_categories',
        ),
    ]
