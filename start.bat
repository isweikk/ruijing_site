@echo off
REM 锐境 AI Website - Quick Start Script

echo ========================================
echo 锐境 AI Website
echo ========================================
echo.

:menu
echo Please select an option:
echo 1. Install dependencies
echo 2. Start development server
echo 3. Build website
echo 4. Clean build files
echo 5. Exit
echo.

set /p choice=Enter your choice (1-5): 

if "%choice%"=="1" goto install
if "%choice%"=="2" goto serve
if "%choice%"=="3" goto build
if "%choice%"=="4" goto clean
if "%choice%"=="5" goto end

echo Invalid choice, please try again.
echo.
goto menu

:install
echo.
echo Installing dependencies...
python -m pip install -r requirements.txt
echo.
echo Dependencies installed successfully!
echo.
pause
goto menu

:serve
echo.
echo Starting development server...
echo Open http://127.0.0.1:8000 in your browser
echo Press Ctrl+C to stop the server
echo.
mkdocs serve
pause
goto menu

:build
echo.
echo Building website...
mkdocs build
echo.
echo Website built successfully! Files are in the 'site' folder.
echo.
pause
goto menu

:clean
echo.
echo Cleaning build files...
if exist site rmdir /s /q site
echo Build files cleaned!
echo.
pause
goto menu

:end
echo.
echo Goodbye!
exit
