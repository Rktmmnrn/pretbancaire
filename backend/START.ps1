#!/usr/bin/env pwsh

# Script de démarrage pour Windows PowerShell
# Usage: .\START.ps1

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " GESTION DES PRETS BANCAIRES - DEMARRAGE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Node.js est installé
Write-Host "🔍 Vérification de Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-Host "❌ Node.js n'est pas installé ou non trouvé dans PATH" -ForegroundColor Red
    Write-Host "Téléchargez-le: https://nodejs.org/" -ForegroundColor White
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green

# Vérifier si npm est installé
Write-Host "🔍 Vérification de npm..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($null -eq $npmVersion) {
    Write-Host "❌ npm n'est pas installé" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "✅ npm $npmVersion détecté" -ForegroundColor Green

# Vérifier si les dépendances sont installées
if (!(Test-Path "node_modules" -PathType Container)) {
    Write-Host ""
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}

Write-Host "✅ Dépendances OK" -ForegroundColor Green

# Vérifier le fichier .env
if (!(Test-Path ".env" -PathType Leaf)) {
    Write-Host ""
    Write-Host "⚠️  Fichier .env non trouvé" -ForegroundColor Yellow
    Write-Host "Création du fichier .env par défaut..." -ForegroundColor Yellow
    
    $envContent = @"
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
"@
    
    Set-Content -Path ".env" -Value $envContent
    Write-Host "✅ Fichier .env créé" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  AVANT DE CONTINUER:" -ForegroundColor Yellow
    Write-Host "1. Assurez-vous que MySQL est installé et lancé" -ForegroundColor White
    Write-Host "2. Exécutez le script database.sql pour créer la BD" -ForegroundColor White
    Write-Host "3. Consultez SETUP_GUIDE.md pour plus d'infos" -ForegroundColor White
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour continuer"
}

# Lancer l'application
Write-Host ""
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Green
Write-Host ""

npm run dev
