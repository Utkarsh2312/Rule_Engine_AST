# client/Dockerfile

# Use the official Node.js image for building the frontend
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app runs (default for React is 3000)
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
