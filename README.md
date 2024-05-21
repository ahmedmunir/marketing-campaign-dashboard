# Marketing Campaign Dashboard

This project is a web-based dashboard that allows users to analyze and visualize marketing campaign performance data. The backend is built with Django, the frontend with React, and PostgreSQL is used as the database.

## Project Structure

- **backend**: Contains the Django project and all backend-related code.
- **frontend**: Contains the React project and all frontend-related code.
- **PostgreSQL**: To store the data of marketing campaign.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/marketing-dashboard.git
cd marketing-dashboard
```

## Setup

Create necessary directories and files:
Ensure the entrypoint.sh, and init-db.sh scripts are in the backend directory and have execute permissions.
```
   chmod +x backend/entrypoint.sh
   chmod +x backend/init-db.sh
   chmod +x backend/wait-for-it.sh
```    
Clean Up Docker Volumes: Remove any existing Docker volumes to ensure a fresh start.
```
    docker-compose down -v
```
Rebuild and Run Docker Compose: Build the Docker images and start the containers.
```
    docker-compose up --build
```

## Postman API collection

```
    https://api.postman.com/collections/33546484-51b7048c-ab88-49ab-a213-9048729aa3e0?access_key=PMAT-01HYCKFVTZFQPXEWA8V7PZ9AD2
```