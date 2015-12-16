from django.db import models
from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, MultiFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from multiselectfield import MultiSelectField
from modelcluster.fields import ParentalKey

#Abstract Program class that inherits from Page and provides template
class AbstractProgram(Page):
    name = models.CharField(max_length=100)

    description = StreamField([
        ('heading', blocks.CharBlock(classname='full title')),
        ('paragraph', blocks.RichTextBlock()),
        ('html', blocks.RawHTMLBlock()),
        ('image', ImageChooserBlock()),
    ])

    class Meta:
        abstract = True


#Programs model which creates programs
class Program(AbstractProgram):
    content_panels = Page.content_panels + [
        FieldPanel('name'),
        StreamFieldPanel('description'),
    ]

#Through relationship for Programs to Subprogram
class ProgramSubprogramRelationship(models.Model):
    program = models.ForeignKey(Program, related_name="+")
    subprogram = ParentalKey('Subprogram', related_name='programs')
    panels = [
        FieldPanel('program'),
    ]

#Subprograms models which when instantiated can be linked to multiple programs
class Subprogram(AbstractProgram):
    parent_programs = models.ManyToManyField(Program, through=ProgramSubprogramRelationship, blank=True)
    content_panels = Page.content_panels + [
        FieldPanel('name'),
        StreamFieldPanel('description'),
        InlinePanel('programs', label=("Programs")),
    ]

