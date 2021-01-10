# Generated by Django 2.2.13 on 2021-01-10 19:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BashPrompts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=100)),
                ('created_on', models.DateField(default=datetime.date.today)),
            ],
            options={
                'db_table': 'task',
                'ordering': ['id'],
            },
        ),
    ]
