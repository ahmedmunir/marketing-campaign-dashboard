from django.db.models import Avg, Sum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    @action(detail=False, methods=['get'])
    def metrics(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if start_date and end_date:
            campaigns = Campaign.objects.filter(start_date__gte=start_date, end_date__lte=end_date)
        else:
            campaigns = Campaign.objects.all()

        metrics = campaigns.aggregate(
            total_impressions=Sum('impressions'),
            total_clicks=Sum('clicks'),
            total_spent=Sum('spent'),
            total_conversions=Sum('total_conversion'),
            total_approved_conversions=Sum('approved_conversion'),
            avg_impressions=Avg('impressions'),
            avg_clicks=Avg('clicks'),
            avg_spent=Avg('spent'),
            avg_total_conversions=Avg('total_conversion'),
            avg_approved_conversions=Avg('approved_conversion')
        )

        return Response(metrics)