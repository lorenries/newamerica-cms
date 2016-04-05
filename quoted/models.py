from django.db import models

from home.models import Post

from wagtail.wagtailcore.models import Page
from wagtail.wagtailadmin.edit_handlers import FieldPanel

from mysite.helpers import paginate_results, get_posts_and_programs


class Quoted(Post):
    """
    Quoted class that inherits from the abstract
    Post model and creates pages for Quoted pages
    where New America was in the news.
    """
    parent_page_types = ['ProgramQuotedPage']
    subpage_types = []

    source = models.TextField(max_length=8000, blank=True, null=True)
    source_url = models.URLField(blank=True, null=True)

    content_panels = Post.content_panels + [
        FieldPanel('source'),
        FieldPanel('source_url'),
    ]

    class Meta:
        verbose_name = "In The News Piece"


class AllQuotedHomePage(Page):
    """
    A page which inherits from the abstract Page model and
    returns every Quoted piece from the Quoted model
    for the organization-wide Quoted Homepage
    """
    parent_page_types = ['home.Homepage']
    subpage_types = []

    def get_context(self, request):
        context = super(AllQuotedHomePage, self).get_context(request)
        all_posts = Quoted.objects.all().order_by("-date")

        context['all_posts'] = paginate_results(request, all_posts)

        return context
    
    class Meta:
        verbose_name = "Homepage for all In The News Pieces"


class ProgramQuotedPage(Page):
    """
    A page which inherits from the abstract Page model and
    returns all Quoted pieces associated with a specific Program
    or Subprogram
    """
    parent_page_types = ['programs.Program', 'programs.Subprogram']
    subpage_types = ['Quoted']

    def get_context(self, request):
        return get_posts_and_programs(
            self,
            request,
            ProgramQuotedPage,
            Quoted
        )

    class Meta:
        verbose_name = "In the News Homepage for Programs and Subprogram"
