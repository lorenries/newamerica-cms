from rest_framework.serializers import Serializer, SerializerMethodField

from home.models import Post
from newamericadotorg.api.helpers import generate_image_url, get_content_type
from newamericadotorg.api.post.serializers import PostSerializer
from newamericadotorg.api.author.serializers import AuthorSerializer
from newamericadotorg.api.program.serializers import PostProgramSerializer, PostSubprogramSerializer


class PostStatsSerializer(Serializer):
    total = SerializerMethodField()
    # blog_posts = SerializerMethodField()
    # policy_papers = SerializerMethodField()
    # reports = SerializerMethodField()
    # articles = SerializerMethodField()
    # quoted = SerializerMethodField()
    # podcasts= SerializerMethodField()

    def get_total(self, obj):
        return obj

    # def get_programs(self, obj):
    #     return PostProgramSerializer(obj.parent_programs, many=True).data

    class Meta:
        model = Post
        fields = (
            'total'
        )
