# Use an official Node runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app
RUN npm run build

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run the app
CMD ["npm", "run", "dev", "--", "--host"]
