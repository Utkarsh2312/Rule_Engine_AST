# Use Node.js base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Bind to port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
