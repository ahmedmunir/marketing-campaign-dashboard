from django.db import models

class Campaign(models.Model):
    ad_id = models.IntegerField()
    xyz_campaign_id = models.IntegerField()
    fb_campaign_id = models.IntegerField()
    age = models.CharField(max_length=10)
    gender = models.CharField(max_length=1)
    interest = models.IntegerField()
    impressions = models.IntegerField()
    clicks = models.IntegerField()
    spent = models.FloatField()
    total_conversion = models.IntegerField()
    approved_conversion = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f'Campaign {self.ad_id}'
