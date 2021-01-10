from django.shortcuts import render

# Create your views here.

from .models import BashPrompt
from .serializers import BashPromptSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

class BashPromptList(APIView):
    """
    View all bash prompts.
    """
    def get(self, request, format=None):
        """
        Return a list of all bash prompts.
        """
        bashPrompts = BashPrompt.objects.all()
        serializer = BashPromptSerializer(bashPrompts, many=True)
        return Response(serializer.data)
