# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-08 05:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0010_change_on_delete_behaviour'),
        ('person', '0009_auto_20160308_0444'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='photo',
        ),
        migrations.AddField(
            model_name='person',
            name='profile_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.Image'),
        ),
    ]
