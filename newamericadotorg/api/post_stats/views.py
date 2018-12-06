from datetime import datetime, timedelta

from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from django_filters import CharFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView

from home.models import Post

from .serializers import PostStatsSerializer


class PostStatsFilter(FilterSet):
    program_id = CharFilter(
        field_name='parent_programs__id', lookup_expr='iexact')

    class Meta:
        model = Post
        fields = ['program_id']


class PostStatsList(ListAPIView):
    serializer_class = PostStatsSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_class = PostStatsFilter

    def get_queryset(self):
        queryset = Post.objects.filter(
            date__range=[datetime.now() + timedelta(-30), datetime.now()])
        total = queryset.count()
        # blog_post = queryset.filter()
        return {
            "total": total
        }
