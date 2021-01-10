from rest_framework import serializers
from .models import BashPrompt

class BashPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = BashPrompt
        fields = ('id', 'name', 'value', 'created_on')
