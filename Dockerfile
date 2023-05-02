# Base image
FROM node:lts

# Create app directory
WORKDIR /orbital

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server files and the React app's build folder
COPY src/server/ ./src/server/
COPY build ./build

# Set the NODE_OPTIONS environment variable
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Expose the port
EXPOSE 3001

# Start the app
CMD ["npm", "run", "server"]