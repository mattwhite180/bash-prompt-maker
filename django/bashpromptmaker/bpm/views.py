from django.shortcuts import render

# Create your views here.

from .models import BashPrompt
from .serializers import BashPromptSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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

    def post(self, request, format=None):
        """
        Create a prompt
        """
        serializer = BashPromptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
