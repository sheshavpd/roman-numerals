# --------------- Build Stage ---------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# --------------- Production Stage ---------------
FROM nginx:stable-alpine

# Copy the build output from previous stage to the nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
