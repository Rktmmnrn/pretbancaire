# 📚 Documentation Complète - Gestion des Prêts Bancaires

## 📋 Table des matières

1. [Installation rapide](#installation-rapide)
2. [Structure du projet](#structure-du-projet)
3. [Fonctionnalités](#fonctionnalités)
4. [Guide de démarrage](#guide-de-démarrage)
5. [API REST](#api-rest)
6. [Fichiers de configuration](#fichiers-de-configuration)
7. [Dépannage](#dépannage)

---

## 🚀 Installation rapide

### Option 1 : Installation manuelle (recommandée)

```powershell
# 1. Installer MySQL
# Télécharger : https://dev.mysql.com/downloads/mysql/

# 2. Créer la base de données
mysql -u root < database.sql

# 3. Démarrer l'application
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

### Option 2 : Avec Docker (si Docker est installé)

```powershell
docker-compose up
# Puis : http://localhost:3000
```

### Option 3 : Script automatique

**Windows CMD** :
```cmd
START.bat
```

**Windows PowerShell** :
```powershell
.\START.ps1
```

---

## 📂 Structure du projet

```
backend/
├── views/
│   └── index.ejs                 # Page principale (formulaire + tableau + graphiques)
├── public/
│   ├── css/
│   │   └── style.css            # Styles CSS (design responsif)
│   └── js/
│       └── app.js               # Logique JavaScript (CRUD + graphiques)
├── routes/
│   └── pretRoutes.js            # Routes API REST
├── controller/
│   └── pretController.js        # Contrôleurs métier
├── models/
│   └── pretModel.js             # Requêtes SQL
├── config/
│   └── db.js                    # Configuration base de données
├── app.js                       # Configuration Express
├── server.js                    # Point d'entrée
├── package.json                 # Dépendances npm
├── .env                         # Variables d'environnement (⚠️ Ne pas committer)
├── database.sql                 # Script création BD
├── Dockerfile                   # Image Docker (optionnel)
├── docker-compose.yml           # Orchestration Docker (optionnel)
├── START.bat                    # Script démarrage Windows
├── START.ps1                    # Script démarrage PowerShell
├── SETUP_GUIDE.md              # Guide installation détaillé
├── DOCKER_GUIDE.md             # Guide Docker
├── INSTALLATION_RAPIDE.md      # Résumé installation
├── FRONTEND_README.md          # Documentation frontend
└── README.md                   # Ce fichier
```

---

## ✨ Fonctionnalités

### 1. 📝 Ajouter un prêt
- Formulaire avec validation
- Champs : N° Compte, Nom Client, Nom Banque, Montant, Date, Taux
- Notification de confirmation

### 2. 📊 Tableau des prêts
- Affichage dynamique de tous les prêts
- Colonnes : N° Compte, Nom Client, Banque, Montant, Date, Taux, **Montant à Payer**
- Tri interactif (optionnel)

### 3. ✏️ Modifier un prêt
- Modal édition au clic du bouton "Modifier"
- Sauvegarde automatique avec mise à jour du tableau

### 4. 🗑️ Supprimer un prêt
- Confirmation avant suppression
- Mise à jour immédiate du tableau

### 5. 📈 Statistiques
- **Total à Payer** : Somme de tous les montants
- **Montant Minimal** : Plus petit montant
- **Montant Maximal** : Plus grand montant
- Mise à jour en temps réel

### 6. 📊 Graphiques
- **Histogramme** : Montants par client
- **Camembert** : Distribution des montants
- Interactifs avec Chart.js

---

## 🎯 Guide de démarrage

### Étape 1 : Vérifier les prérequis
```powershell
node --version
npm --version
mysql --version
```

### Étape 2 : Installer les dépendances
```powershell
cd "D:\projets\PretBancaire\pretbancaire\backend"
npm install
```

### Étape 3 : Configurer la base de données
```powershell
# Créer la BD et les tables
mysql -u root < database.sql

# Vérifier
mysql -u root -e "USE pret_bancaire; SHOW TABLES;"
```

### Étape 4 : Configurer les variables
Le fichier `.env` est créé automatiquement. Si MySQL a un mot de passe :
```env
DATABASE_PASSWORD=votre_mot_de_passe
```

### Étape 5 : Lancer l'application
```powershell
npm run dev
```

Vous verrez :
```
[nodemon] starting `node server.js`
L'app écoute sur le port: 3000 actuellement
database connected
```

### Étape 6 : Accéder à l'application
Ouvrez votre navigateur : http://localhost:3000

---

## 🔌 API REST

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### GET /pret
**Récupérer tous les prêts**
```bash
curl http://localhost:3000/api/pret
```

Response :
```json
[
  {
    "id_pret": 1,
    "num_compte": "ACC001",
    "nom_client": "Jean Dupont",
    "nom_banque": "BNP Paribas",
    "montant": 10000,
    "date_pret": "2024-01-15",
    "taux_pret": 0.045,
    "montant_a_payer": 10450
  }
]
```

#### POST /pret
**Créer un nouveau prêt**
```bash
curl -X POST http://localhost:3000/api/pret \
  -H "Content-Type: application/json" \
  -d '{
    "num_compte": "ACC006",
    "nom_client": "Nouveau Client",
    "nom_banque": "Ma Banque",
    "montant": 50000,
    "date_pret": "2024-06-01",
    "taux_pret": 0.04
  }'
```

#### GET /pret/:id_pret
**Récupérer un prêt spécifique**
```bash
curl http://localhost:3000/api/pret/1
```

#### PUT /pret/:id_pret
**Mettre à jour un prêt**
```bash
curl -X PUT http://localhost:3000/api/pret/1 \
  -H "Content-Type: application/json" \
  -d '{
    "num_compte": "ACC001",
    "nom_client": "Jean Dupont Modifié",
    "nom_banque": "BNP Paribas",
    "montant": 12000,
    "date_pret": "2024-01-15",
    "taux_pret": 0.045
  }'
```

#### DELETE /pret/:id_pret
**Supprimer un prêt**
```bash
curl -X DELETE http://localhost:3000/api/pret/1
```

---

## ⚙️ Fichiers de configuration

### .env
```env
PORT=3000                           # Port du serveur
DATABASE_HOST=localhost             # Adresse MySQL
DATABASE_USER=root                  # Utilisateur MySQL
DATABASE_PASSWORD=                  # Mot de passe (vide par défaut)
DATABASE_NAME=pret_bancaire         # Nom de la BD
```

### database.sql
Crée automatiquement :
- Base de données `pret_bancaire`
- Table `Pret_bancaire` avec les colonnes
- Index pour les recherches rapides
- 5 données d'exemple (optionnel)

### Dépendances (package.json)
- **express** - Framework web
- **mysql** - Driver MySQL
- **dotenv** - Gestion variables d'environnement
- **ejs** - Templating HTML
- **cors** - Middleware CORS
- **nodemon** - Dev : rechargement automatique

---

## 🆘 Dépannage

### ❌ "Access denied for user 'root'@'localhost'"
**Cause** : MySQL ne répond pas ou credentials incorrectes

**Solutions** :
1. Vérifier que MySQL est lancé (Services Windows)
2. Vérifier le mot de passe dans `.env`
3. Tester : `mysql -u root -p` (ou sans -p si pas de mot de passe)

### ❌ "Cannot find module 'mysql'"
**Cause** : Dépendances non installées

**Solution** :
```powershell
npm install
```

### ❌ "Cannot find module 'ejs'"
**Cause** : EJS pas installé

**Solution** :
```powershell
npm install ejs
```

### ❌ "ENOENT: no such file or directory, open '.env'"
**Cause** : Fichier .env manquant

**Solution** :
Créer `.env` manuellement ou lancer `START.ps1`

### ❌ "EADDRINUSE: address already in use :::3000"
**Cause** : Port 3000 déjà utilisé

**Solutions** :
1. Arrêter l'autre processus
2. Ou changer PORT dans `.env` (ex: 3001)

### ❌ "Client does not support authentication protocol"
**Cause** : Ancienne version MySQL incompatible

**Solution** :
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### ❌ Graphiques vides
**Cause** : Pas de données dans la base

**Solution** :
1. Ajouter manuellement un prêt via le formulaire
2. Ou ré-exécuter `database.sql` avec données d'exemple

---

## 📊 Formules de calcul

**Montant à Payer = Montant du Prêt × (1 + Taux du Prêt)**

Exemple :
- Prêt : 10 000 €
- Taux : 5% (0.05)
- Montant à Payer = 10 000 × (1 + 0.05) = **10 500 €**

---

## 🌐 Technologie utilisée

- **Backend** : Node.js + Express.js
- **Frontend** : EJS + HTML5 + CSS3 + JavaScript
- **Base de données** : MySQL
- **Graphiques** : Chart.js
- **Containers** : Docker (optionnel)

---

## 📝 Notes importantes

✅ Le fichier `.env` ne doit pas être committé en Git
✅ MySQL doit être en cours d'exécution
✅ Les taux sont stockés en décimal (0.05 = 5%)
✅ Les montants sont arrondis à 2 décimales
✅ Tous les graphiques se mettent à jour en temps réel

---

## 🤝 Support

Pour des problèmes :
1. Consultez les fichiers `SETUP_GUIDE.md` ou `DOCKER_GUIDE.md`
2. Vérifiez la console du navigateur (F12)
3. Consultez les logs du serveur
4. Vérifiez les erreurs MySQL

---

## 📅 Version

- Version : 1.0.0
- Date : Juin 2024
- État : Production Ready ✅

Bon développement ! 🚀
