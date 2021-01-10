from django.shortcuts import render
from django.http import Http404
# Create your views here.

from .models import BashPrompt
from .serializers import BashPromptSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics

"""
class BashPromptList(generics.ListCreateAPIView):
    queryset = BashPrompt.objects.all()
    serializer_class = BashPromptSerializer
"""
class BashPromptList(APIView):
    #View all bash prompts.
    def get(self, request, format=None):
        #Return a list of all bash prompts.
        bashPrompts = BashPrompt.objects.all()
        serializer = BashPromptSerializer(bashPrompts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        #Create a prompt
        serializer = BashPromptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BashPromptDetails(APIView):
    
    def get_object(self, bashPrompt_id):
        try:
            return BashPrompt.objects.get(pk=bashPrompt_id)
        except BashPrompt.DoesNotExist:
            raise Http404

    def get(self, request, bashPrompt_id, formate=None):
        bp = self.get_object(bashPrompt_id)
        serializer = BashPromptSerializer(bp)
        return Response(serializer.data)

    def put(self, request, bp_id, format=None):
        bp = self.get_object(bp_id)
        serializer = BashPromptSerializer(bp, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bp_id, format=None):
        bp = self.get_object(bp_id)
        bp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

