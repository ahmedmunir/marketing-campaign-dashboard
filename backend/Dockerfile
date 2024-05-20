# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install PostgreSQL client utilities
RUN apt-get update && apt-get install -y postgresql-client netcat-openbsd

# Copy the current directory contents into the container at /app
COPY . /app

# Ensure the wait-for-it script has the necessary permissions
RUN chmod +x /app/wait-for-it.sh

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the entrypoint to the script
ENTRYPOINT ["/app/entrypoint.sh"]
