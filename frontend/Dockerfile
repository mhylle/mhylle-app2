# Multi-stage build for Angular
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application with correct base href for subpath routing
RUN npm run build:prod

# Production stage with nginx
FROM nginx:alpine

# Copy built application to nginx html directory
COPY --from=build /app/dist/app2-frontend /usr/share/nginx/html/app2

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nginx -u 1001

# Set proper permissions
RUN chown -R nginx:nodejs /usr/share/nginx/html && \
    chown -R nginx:nodejs /var/cache/nginx && \
    chown -R nginx:nodejs /var/log/nginx && \
    chown -R nginx:nodejs /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
