# Base image
FROM node:lts

# Create app directory
WORKDIR /orbital

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server and client files
COPY src/ ./src/
COPY public/ ./public/
# Build the client app
RUN cd src/client && npm run build

# Expose the ports
EXPOSE 3000
EXPOSE 3001

# Start the app
CMD ["npm", "start"]