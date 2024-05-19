import json
from django.core.management.base import BaseCommand
from campaigns.models import Campaign
import os
import shutil
from datetime import datetime

class Command(BaseCommand):
    help = 'Load data from a JSON file'

    def handle(self, *args, **kwargs):
        zip_file_path = 'Trail Assesment.zip'
        extract_to = 'extracted_files'
        nested_directory = 'Trail Assesment'
        json_file_name = 'Dataset/data.json'
        
        # Check if the zip file exists
        if not os.path.exists(zip_file_path):
            self.stderr.write(self.style.ERROR(f'Zip file not found: {zip_file_path}'))
            return

        # Create extraction directory if it does not exist
        if not os.path.exists(extract_to):
            os.makedirs(extract_to)

        # Extract the zip file
        import zipfile
        with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to)

        # Construct the full path to the JSON file
        json_file_path = os.path.join(extract_to, nested_directory, json_file_name)

        # Check if the JSON file exists
        if not os.path.exists(json_file_path):
            self.stderr.write(self.style.ERROR(f'JSON file not found: {json_file_path}'))
            return

        # Load the JSON data
        with open(json_file_path, 'r') as f:
            data = json.load(f)

        # Clear existing data
        Campaign.objects.all().delete()

        # Load new data
        for item in data:
            Campaign.objects.create(
                ad_id=item['ad_id'],
                xyz_campaign_id=item['xyz_campaign_id'],
                fb_campaign_id=item['fb_campaign_id'],
                age=item['age'],
                gender=item['gender'],
                interest=item['interest'],
                impressions=item['Impressions'],
                clicks=item['Clicks'],
                spent=item['Spent'],
                total_conversion=item['Total_Conversion'],
                approved_conversion=item['Approved_Conversion'],
                start_date=datetime.strptime(item['Start Date'], '%d-%b-%y').date(),
                end_date=datetime.strptime(item['End Date'], '%d-%b-%y').date()
            )

        # Delete the extracted directory after loading the data
        shutil.rmtree(extract_to)

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
