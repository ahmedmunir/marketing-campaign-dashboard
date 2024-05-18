# Dockerfile for React
FROM node:16

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
RUN npm install

# Copy project files
COPY . /app/

# Build the application
RUN npm run build

# Serve the application
CMD ["npx", "serve", "-s", "build"]
