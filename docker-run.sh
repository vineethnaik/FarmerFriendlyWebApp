#!/bin/bash

# Docker Desktop deployment script for AgriZen Backend

echo "🚀 Starting AgriZen Backend with Docker Desktop..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Stop existing containers if running
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional)
echo "🧹 Cleaning up old images..."
docker system prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Test backend health
echo "🏥 Testing backend health..."
curl -f http://localhost:8080/actuator/health || echo "❌ Backend health check failed"

echo "✅ Deployment complete!"
echo "🌐 Backend URL: http://localhost:8080"
echo "🗄️  MySQL URL: localhost:3306"
echo "📊 Health Check: http://localhost:8080/actuator/health"
echo ""
echo "📋 Available endpoints:"
echo "  - POST /api/auth/register"
echo "  - POST /api/auth/login"
echo "  - GET /api/crops"
echo "  - POST /api/farmers/{id}/crops"
echo ""
echo "🛑 To stop: docker-compose down"
echo "📝 To view logs: docker-compose logs -f"
