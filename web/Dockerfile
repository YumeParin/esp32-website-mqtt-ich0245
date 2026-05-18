FROM nginx:1.30-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy website
COPY index.html /usr/share/nginx/html/index.html
# Copy assets
# Copy reverse proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]