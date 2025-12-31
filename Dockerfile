# --- Stage 1: Build the App ---
# We use Node 20 on Alpine (a very small, lightweight Linux)
FROM node:20-alpine AS builder

# Set the working folder inside the container
WORKDIR /app

# Copy package files first to install dependencies efficiently
COPY package*.json ./
RUN npm install

# Copy the rest of your website code
COPY . .

# 1. Accept the API Key from the build tool
ARG GEMINI_API_KEY
# 2. Write it to a file so Vite can use it during the build
RUN echo "VITE_GEMINI_API_KEY=$GEMINI_API_KEY" > .env.local

# Build the React app (creates a 'dist' or 'build' folder)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy the custom nginx config we created above
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the 'builder' stage to Nginx
# Note: Vite usually builds to './dist'. If you use Create-React-App, change this to './build'
COPY --from=builder /app/dist /usr/share/nginx/html

# Open port 8080 (Required for Cloud Run)
EXPOSE 8080

# Start Nginx in the foreground so the container stays running
CMD ["nginx", "-g", "daemon off;"]
