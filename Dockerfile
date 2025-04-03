# Stage 1: Build the client (frontend)
FROM node:18 AS client-build

WORKDIR /app/client

# Copy client package.json and package-lock.json
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy client source code
COPY client/ .

# Build the client
RUN npm run build

# Stage 2: Build the server (backend)
FROM node:18 AS server-build

WORKDIR /app/server

# Copy server package.json and package-lock.json
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy server source code
COPY server/ .

# Copy shared code
COPY shared/ ../shared

# Copy client build to server public directory
COPY --from=client-build /app/client/dist ./public

# Expose the port the server will run on
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]