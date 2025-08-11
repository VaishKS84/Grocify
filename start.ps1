Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    GROCIFY FULLSTACK APPLICATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you start the application" -ForegroundColor White
Write-Host ""
Write-Host "Step 1: Make sure MySQL is running" -ForegroundColor Yellow
Write-Host "Step 2: Start the Backend (will open in new window)" -ForegroundColor Yellow
Write-Host "Step 3: Start the Frontend (will open in new window)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Starting Backend on port 8081..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; mvn spring-boot:run" -WindowStyle Normal

Write-Host ""
Write-Host "Waiting 10 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "Starting Frontend on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    APPLICATION STARTED!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend: http://localhost:8081" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Default login credentials:" -ForegroundColor Yellow
Write-Host "Username: admin" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
