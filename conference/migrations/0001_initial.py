# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-11-08 18:35
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('home', '0011_auto_20161020_1033'),
        ('wagtailcore', '0028_merge'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllConferencesHomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
            ],
            options={
                'verbose_name': 'Homepage for all Conferences',
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='Conference',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('description', wagtail.wagtailcore.fields.RichTextField(help_text=b'This will be the ABOUT text')),
                ('subheading', models.TextField(blank=True, null=True)),
                ('story_excerpt', models.CharField(blank=True, max_length=140, null=True, verbose_name=b'excerpt')),
                ('host_organization', models.TextField(blank=True, default=b'New America', null=True)),
                ('rsvp_link', models.URLField(blank=True, null=True)),
                ('date', models.DateField(default=django.utils.timezone.now, verbose_name=b'Start Date')),
                ('end_date', models.DateField(blank=True, null=True)),
                ('location_name', models.TextField(blank=True, help_text=b'Name of building (e.g. the Kennedy Center)', null=True)),
                ('street', models.TextField(blank=True, default=b'740 15th St NW #900', null=True)),
                ('city', models.TextField(blank=True, default=b'Washington', null=True)),
                ('state', models.TextField(blank=True, default=b'D.C.', null=True)),
                ('zipcode', models.TextField(blank=True, default=b'20005', null=True)),
                ('venue', wagtail.wagtailcore.fields.StreamField([(b'paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), (b'columns', wagtail.wagtailcore.blocks.StructBlock([(b'left_column', wagtail.wagtailcore.blocks.RichTextBlock()), (b'right_column', wagtail.wagtailcore.blocks.RichTextBlock())]))], blank=True, null=True)),
                ('directions', wagtail.wagtailcore.fields.StreamField([(b'direction', wagtail.wagtailcore.blocks.StructBlock([(b'transportation_type', wagtail.wagtailcore.blocks.CharBlock(help_text=b'e.g car, metro, taxi')), (b'directions', wagtail.wagtailcore.blocks.RichTextBlock())]))], blank=True, null=True)),
                ('speakers', wagtail.wagtailcore.fields.StreamField([(b'person', wagtail.wagtailcore.blocks.StructBlock([(b'name', wagtail.wagtailcore.blocks.TextBlock(required=True)), (b'title', wagtail.wagtailcore.blocks.TextBlock()), (b'description', wagtail.wagtailcore.blocks.RichTextBlock()), (b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon=b'image')), (b'twitter', wagtail.wagtailcore.blocks.URLBlock(required=False))]))], blank=True, null=True)),
                ('partners', wagtail.wagtailcore.fields.StreamField([(b'partner', wagtail.wagtailcore.blocks.StructBlock([(b'name', wagtail.wagtailcore.blocks.TextBlock()), (b'type', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'premier_sponsor', b'Premier Sponsor'), (b'sponsor', b'Sponsor'), (b'media_partner', b'Media Partner'), (b'recognized_partner', b'Recognized Partner')])), (b'logo', wagtail.wagtailimages.blocks.ImageChooserBlock(icon=b'image'))]))], blank=True, null=True)),
                ('sessions', wagtail.wagtailcore.fields.StreamField([(b'days', wagtail.wagtailcore.blocks.StructBlock([(b'day', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'1', b'1'), (b'2', b'2'), (b'3', b'3'), (b'4', b'4'), (b'5', b'5'), (b'6', b'6')], help_text=b'What day of the conference is this session on?')), (b'start_time', wagtail.wagtailcore.blocks.TimeBlock()), (b'end_time', wagtail.wagtailcore.blocks.TimeBlock()), (b'sessions', wagtail.wagtailcore.blocks.StreamBlock([(b'session', wagtail.wagtailcore.blocks.StructBlock([(b'name', wagtail.wagtailcore.blocks.TextBlock()), (b'session_type', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'panel', b'Panel'), (b'lecture', b'Lecture'), (b'break', b'Break'), (b'meal', b'Meal'), (b'reception', b'Reception'), (b'registration', b'Registration')])), (b'description', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), (b'start_time', wagtail.wagtailcore.blocks.TimeBlock()), (b'end_time', wagtail.wagtailcore.blocks.TimeBlock(required=False)), (b'speakers', wagtail.wagtailcore.blocks.StreamBlock([(b'speaker', wagtail.wagtailcore.blocks.StructBlock([(b'name', wagtail.wagtailcore.blocks.TextBlock(required=True)), (b'title', wagtail.wagtailcore.blocks.TextBlock())]))])), (b'archived_video_link', wagtail.wagtailcore.blocks.URLBlock(help_text=b'Enter youtube link after conference', required=False))]))]))]))], blank=True, null=True)),
                ('about_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.CustomImage', verbose_name=b'About Image')),
                ('story_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='home.CustomImage', verbose_name=b'Cover Image')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
    ]