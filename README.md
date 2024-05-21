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
Ensure the entrypoint.sh, wait-for-it.sh,  and init-db.sh scripts are in the backend directory and have execute permissions.
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

## Design Decisions
### 1. Technology Stack

* Frontend: React with Echarts
    * React: Chosen for its component-based architecture and state management capabilities, making it ideal for building interactive UIs.
    *  Echarts: a powerful, interactive charting and visualization library for browser. 
*  Backend: RESTful API built with Django
    * Django: Known for its robust and scalable architecture, it is suitable for handling complex data queries and managing the application’s business logic.

### 2. Dynamic Data Retrieval

*  Axios: Used for making HTTP requests to the backend API.
*  State Management: React's useState and useEffect hooks manage the state of the data and ensure components update dynamically when data is fetched or changes.

### 3. Component Structure

*  Dashboard Component: Serves as the main container, incorporating the bar chart for campaign metrics and the table for raw campaign data.
*  Date Pickers: Allow users to select date ranges for filtering the displayed metrics.
*  Checkboxes: Enable users to select specific metrics to be displayed on the bar chart.
*  Table: Displays raw campaign data with features like pagination, sorting, and filtering, enhancing data management capabilities.

### 4. User Experience

*  Responsive Design: Ensures the dashboard is accessible and usable on both desktop and mobile devices.
*  Interactive Elements: Date pickers, checkboxes, and table controls provide a dynamic and interactive user experience.

## Challenges Faced
### 1. Data Handling

*  Dynamic Data Loading: Ensuring that the dashboard components update dynamically based on API responses was crucial. This required careful state management and efficient use of React hooks.

### 2. UI/UX Design

*  Responsive Layout: Designing a layout that adapts seamlessly to different screen sizes was essential.
*  Chart Readability: Balancing the readability of the bar chart with the amount of data presented was challenging. Adjusting bar widths and enabling axis swapping improved readability.

### 3. Backend Integration

*   API Consistency: Ensuring that the frontend correctly interprets and handles the data received from the backend was crucial. This involved handling various data formats and ensuring the API endpoints provided the necessary data efficiently.

### Additional Features and Optimizations
### 1. Sorting and Filtering

*   Implemented sorting and filtering on the frontend for immediate responsiveness. For larger datasets, moving these functionalities to the backend would enhance performance and scalability.

### 2. Loading Indicators

*  Added loading indicators to provide feedback to users during data retrieval, improving the overall user experience.

### 3. Deployment using Docker
*  Using Docker and Docker Compose ensures that the application runs in a consistent environment, eliminating the "works on my machine" problem. It simplifies the setup process, making it easier to deploy and scale applications by managing multiple services and their dependencies efficiently.