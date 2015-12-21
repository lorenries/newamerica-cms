# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0020_add_index_on_page_first_published_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Program',
            fields=[
                ('page_ptr', models.OneToOneField(serialize=False, parent_link=True, to='wagtailcore.Page', primary_key=True, auto_created=True)),
                ('name', models.CharField(max_length=100)),
                ('description', wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), ('html', wagtail.wagtailcore.blocks.RawHTMLBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock())))),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='ProgramSubprogramRelationship',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('program', models.ForeignKey(to='programs.Program', related_name='+')),
            ],
        ),
        migrations.CreateModel(
            name='Subprogram',
            fields=[
                ('page_ptr', models.OneToOneField(serialize=False, parent_link=True, to='wagtailcore.Page', primary_key=True, auto_created=True)),
                ('name', models.CharField(max_length=100)),
                ('description', wagtail.wagtailcore.fields.StreamField((('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), ('html', wagtail.wagtailcore.blocks.RawHTMLBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock())))),
                ('parent_programs', models.ManyToManyField(blank=True, to='programs.Program', through='programs.ProgramSubprogramRelationship')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.AddField(
            model_name='programsubprogramrelationship',
            name='subprogram',
            field=modelcluster.fields.ParentalKey(to='programs.Subprogram', related_name='programs'),
        ),
    ]
