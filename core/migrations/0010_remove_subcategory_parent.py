# Generated by Django 5.0.7 on 2024-07-19 21:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_alter_curso_options_curso_created_curso_updated_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subcategory',
            name='parent',
        ),
    ]
