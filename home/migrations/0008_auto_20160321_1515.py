# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-21 15:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20160308_1617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='story_excerpt',
            field=models.CharField(blank=True, max_length=140, null=True),
        ),
    ]