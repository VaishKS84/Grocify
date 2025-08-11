@echo off
echo ========================================
echo    GROCIFY FULLSTACK APPLICATION
echo ========================================
echo.
echo This script will help you start the application
echo.
echo Step 1: Make sure MySQL is running
echo Step 2: Start the Backend (will open in new window)
echo Step 3: Start the Frontend (will open in new window)
echo.
echo Press any key to continue...
pause >nul

echo.
echo Starting Backend on port 8081...
start "Backend" cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

echo.
echo Waiting 10 seconds for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend on port 5173...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo    APPLICATION STARTED!
echo ========================================
echo.
echo Backend: http://localhost:8081
echo Frontend: http://localhost:5173
echo.
echo Default login credentials:
echo Username: admin
echo Password: admin123
echo.
echo Press any key to exit this window...
pause >nul
