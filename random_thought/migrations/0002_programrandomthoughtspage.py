# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-29 18:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0040_page_draft_title'),
        ('home', '0043_auto_20181129_1317'),
        ('random_thought', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramRandomThoughtsPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('subheading', wagtail.core.fields.RichTextField(blank=True, null=True)),
                ('story_excerpt', models.CharField(blank=True, max_length=500, null=True)),
                ('story_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.CustomImage')),
            ],
            options={
                'verbose_name': 'Random Thoughts Homepage',
            },
            bases=('wagtailcore.page',),
        ),
    ]
