# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2018-07-18 13:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0033_auto_20180614_1457'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customrendition',
            name='focal_point_key',
            field=models.CharField(blank=True, default='', editable=False, max_length=16),
        ),
    ]