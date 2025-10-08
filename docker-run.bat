@echo off
REM Docker Desktop deployment script for AgriZen Backend

echo 🚀 Starting AgriZen Backend with Docker Desktop...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Stop existing containers if running
echo 🛑 Stopping existing containers...
docker-compose down

REM Remove old images (optional)
echo 🧹 Cleaning up old images...
docker system prune -f

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check if services are running
echo 🔍 Checking service status...
docker-compose ps

REM Test backend health
echo 🏥 Testing backend health...
curl -f http://localhost:8080/actuator/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Backend health check failed
) else (
    echo ✅ Backend is healthy
)

echo ✅ Deployment complete!
echo 🌐 Backend URL: http://localhost:8080
echo 🗄️  MySQL URL: localhost:3306
echo 📊 Health Check: http://localhost:8080/actuator/health
echo.
echo 📋 Available endpoints:
echo   - POST /api/auth/register
echo   - POST /api/auth/login
echo   - GET /api/crops
echo   - POST /api/farmers/{id}/crops
echo.
echo 🛑 To stop: docker-compose down
echo 📝 To view logs: docker-compose logs -f
pause
