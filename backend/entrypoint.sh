#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Wait for the PostgreSQL service to be ready
# /app/wait-for-it.sh db -- echo "Postgres is up - continuing"

# Apply database migrations
python manage.py migrate

# Load initial data
python manage.py load_data

# Start the development server
python manage.py runserver 0.0.0.0:8000
