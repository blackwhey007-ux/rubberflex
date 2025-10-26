@echo off
echo ========================================
echo    RUBBERFLEX - Demarrage en 1 Clic
echo ========================================
echo.

echo [1/3] Demarrage du Backend...
start "RUBBERFLEX Backend" cmd /k "cd backend && node src/server-simple.js"
timeout /t 3 /nobreak > nul

echo [2/3] Demarrage du Frontend...
start "RUBBERFLEX Frontend" cmd /k "npm run dev:frontend"
timeout /t 5 /nobreak > nul

echo [3/3] Ouverture du navigateur...
start http://localhost:5173/

echo.
echo ========================================
echo    RUBBERFLEX est maintenant actif!
echo ========================================
echo.
echo Site Public:       http://localhost:5173/
echo Admin:             http://localhost:5173/admin
echo Backend API:       http://localhost:3000/
echo.
echo Identifiants Admin:
echo   Email: admin@rubberflex.tn
echo   Password: admin123
echo.
echo Appuyez sur une touche pour fermer...
pause > nul

