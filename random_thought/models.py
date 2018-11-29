from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import StreamFieldPanel, FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from home.models import Post
from programs.models import AbstractContentPage
from home.models import AbstractHomeContentPage

# Create your models here.


class RandomThought(Post):

    parent_page_types = ['ProgramRandomThoughtsPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Random Thought'


class AllRandomThoughtsHomePage(AbstractHomeContentPage):
    """
    A page which inherits from the abstract Page model and
    returns every Blog post in the BlogPost model for the
    Blog posts homepage
    """
    parent_page_types = ['home.HomePage', ]
    subpage_types = []

    @property
    def content_model(self):
        return RandomThought

    class Meta:
        verbose_name = "New America Random Thoughts"


class ProgramRandomThoughtsPage(AbstractContentPage):
    """
    A page which inherits from the abstract Page model and returns
    all Blog Posts associated with a specific Program or
    Subprogram
    """

    parent_page_types = ['programs.Program',
                         'programs.Subprogram', 'programs.Project']
    subpage_types = ['RandomThought']

    subheading = RichTextField(blank=True, null=True)

    # Story excerpt and story image fields are to provide information
    # about the blog if it is featured on a homepage
    # or program landing page
    story_excerpt = models.CharField(blank=True, null=True, max_length=500)

    story_image = models.ForeignKey(
        'home.CustomImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('subheading'),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('story_excerpt'),
        ImageChooserPanel('story_image'),
    ]

    @property
    def content_model(self):
        return RandomThought

    class Meta:
        verbose_name = "Random Thoughts Homepage"
