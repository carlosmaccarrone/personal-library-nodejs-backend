# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock first (to take advantage of cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all code
COPY . .

# Expose the API port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]