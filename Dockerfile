# Base image to use
FROM node:latest

# set a working directory
WORKDIR /src

# Copy across project configuration information
# Install application dependencies
COPY package*.json /src/

# Install Bootstrap
RUN npm install bootstrap


# Ask npm to install the dependencies
RUN npm install -g supervisor && npm install && npm install supervisor


# Install Bootstrap
RUN npm install bootstrap

# Build your Docker image using the Dockerfile:
# Copy this line to your terminal "docker build -t your-image-name"
# This will build the Docker image with the updated dependencies, including Bootstrap.

# Run a container using the built image:
# Copy this line to your terminal "docker run -p 3000:3000 your-image-name"

# Copy across all our files
COPY . /src

# Expose our application port (3000)
EXPOSE 3000
