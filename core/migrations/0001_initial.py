# Generated by Django 5.0.7 on 2024-07-17 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Nombre')),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Precio')),
                ('image', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Imagen Principal')),
                ('link', models.URLField(blank=True, max_length=300, null=True, verbose_name='Link de Compra')),
                ('is_public', models.BooleanField(default=False, help_text='Marca para que todos puedan ver este curso', verbose_name='Es Publico')),
                ('brand', models.CharField(choices=[('per', 'Desarrollo Personal'), ('pro', 'Crecimiento Profesional')], default='per', max_length=3, verbose_name='Motivación')),
            ],
        ),
    ]