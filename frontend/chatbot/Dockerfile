# Use a Node image to build the React app
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install the dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code and build it
COPY . .
RUN npm run build

# Use a lightweight NGINX server to serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web traffic
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]