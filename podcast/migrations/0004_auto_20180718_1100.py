# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-18 15:00
from __future__ import unicode_literals

from django.db import migrations
import wagtail.core.fields
import wagtail.embeds.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('podcast', '0003_auto_20180327_1718'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podcast',
            name='soundcloud',
            field=wagtail.core.fields.StreamField((('soundcloud_embed', wagtail.embeds.blocks.EmbedBlock()),)),
        ),
    ]