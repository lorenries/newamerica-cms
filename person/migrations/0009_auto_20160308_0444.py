# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-08 04:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('person', '0008_auto_20160210_0408'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='name',
        ),
        migrations.AddField(
            model_name='person',
            name='first_name',
            field=models.CharField(default='Name', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='person',
            name='last_name',
            field=models.CharField(default='Last', max_length=150),
            preserve_default=False,
        ),
    ]
