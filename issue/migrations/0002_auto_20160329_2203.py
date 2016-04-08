# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-29 22:03
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20160325_1752'),
        ('wagtailforms', '0003_capitalizeverbose'),
        ('wagtailcore', '0023_alter_page_revision_on_delete_behaviour'),
        ('wagtailredirects', '0005_capitalizeverbose'),
        ('issue', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='issue',
            name='post_ptr',
        ),
        migrations.RemoveField(
            model_name='programissuespage',
            name='page_ptr',
        ),
        migrations.DeleteModel(
            name='Issue',
        ),
        migrations.DeleteModel(
            name='ProgramIssuesPage',
        ),
    ]
