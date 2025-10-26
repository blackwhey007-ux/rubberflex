@echo off
echo.
echo ===============================================
echo   RUBBERFLEX SaaS - LANCEMENT
echo ===============================================
echo.

cd backend

echo 1. Installation des dependances...
call npm install sqlite3 @types/sqlite3
echo.

echo 2. Demarrage du serveur...
echo.
echo    L'API sera disponible sur: http://localhost:3000
echo.
echo    Admin: admin@rubberflex.tn / admin123
echo.
echo ===============================================
echo.

node --loader ts-node/esm --experimental-specifier-resolution=node src/server.ts

pause

