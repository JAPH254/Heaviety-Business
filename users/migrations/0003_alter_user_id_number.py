# Generated by Django 4.2.11 on 2024-05-29 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_id_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id_number',
            field=models.IntegerField(blank=True, null=True, unique=True),
        ),
    ]
