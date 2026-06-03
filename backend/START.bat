@echo off
REM Script de démarrage pour Windows PowerShell

echo.
echo ================================================
echo  GESTION DES PRETS BANCAIRES - DEMARRAGE
echo ================================================
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé ou non trouvé dans PATH
    echo Téléchargez-le: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté

REM Vérifier si npm est installé
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm n'est pas installé
    pause
    exit /b 1
)

echo ✅ npm détecté

REM Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo.
    echo 📦 Installation des dépendances...
    call npm install
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
)

echo ✅ Dépendances OK

REM Vérifier le fichier .env
if not exist ".env" (
    echo.
    echo ⚠️  Fichier .env non trouvé
    echo Création du fichier .env par défaut...
    (
        echo PORT=3000
        echo DATABASE_HOST=localhost
        echo DATABASE_USER=root
        echo DATABASE_PASSWORD=
        echo DATABASE_NAME=pret_bancaire
    ) > .env
    echo ✅ Fichier .env créé
    echo.
    echo ⚠️  AVANT DE CONTINUER:
    echo 1. Assurez-vous que MySQL est installé et lancé
    echo 2. Exécutez le script database.sql pour créer la BD
    echo 3. Consultez SETUP_GUIDE.md pour plus d'infos
    echo.
    pause
)

REM Lancer l'application
echo.
echo 🚀 Démarrage de l'application...
echo.
call npm run dev

pause
