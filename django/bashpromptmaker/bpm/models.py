from django.db import models

from datetime import date

# Create the Task class to describe the model.
class BashPrompt(models.Model):
    name = models.CharField(max_length=50)
    value = models.CharField(max_length=100)
    created_on = models.DateField(default=date.today)

    class Meta:
        # Set the table name.
        db_table = 'task'

        # Set default ordering
        ordering = ['id']

    def __str__(self):
        return self.name
