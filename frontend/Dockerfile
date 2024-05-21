# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Set the command to run the app using serve
CMD ["serve", "-s", "build"]
