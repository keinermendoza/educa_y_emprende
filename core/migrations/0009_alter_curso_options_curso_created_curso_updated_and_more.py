# Generated by Django 5.0.7 on 2024-07-17 18:14

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_curso_summary'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='curso',
            options={'ordering': ['-created']},
        ),
        migrations.AddField(
            model_name='curso',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Fecha de Creación'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='curso',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Última Actualización'),
        ),
        migrations.AddIndex(
            model_name='curso',
            index=models.Index(fields=['-created'], name='core_curso_created_336ec6_idx'),
        ),
    ]