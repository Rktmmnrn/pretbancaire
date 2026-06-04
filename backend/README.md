# 🏦 Gestion des Prêts Bancaires - Backend Express

Application web complète pour gérer des prêts bancaires avec formulaire, tableau interactif, statistiques en temps réel et graphiques.

## 📋 Table des matières

- [Démarrage rapide](#démarrage-rapide)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Installation détaillée](#installation-détaillée)
- [API REST](#api-rest)
- [Dépannage](#dépannage)

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js v14+
- MySQL 5.7+

### Installation (3 étapes)

```bash
# 1. Installer les dépendances
npm install

# 2. Créer la base de données
mysql -u root < database.sql

# 3. Lancer l'application
npm run dev
```

Accédez à **http://localhost:3000** dans votre navigateur.

---

## 📂 Structure du projet

```
backend/
├── views/
│   └── index.ejs              # Template principal (formulaire + tableau + graphiques)
├── public/
│   ├── css/
│   │   └── style.css          # Styles CSS (design responsif)
│   └── js/
│       └── app.js             # Logique JavaScript (CRUD + graphiques)
├── routes/
│   └── pretRoutes.js          # Routes API REST
├── controller/
│   └── pretController.js      # Logique métier
├── models/
│   └── pretModel.js           # Requêtes SQL
├── config/
│   └── db.js                  # Configuration MySQL
├── app.js                     # Configuration Express
├── server.js                  # Point d'entrée
├── package.json               # Dépendances npm
├── .env                       # Variables d'environnement (non versionné)
├── database.sql               # Schéma et données BD
├── Dockerfile                 # Image Docker (optionnel)
├── docker-compose.yml         # Orchestration Docker (optionnel)
├── DOCKER.md                  # Guide Docker
├── INSTALLATION.md            # Guide installation détaillé
├── views/FRONTEND.md          # Documentation frontend
└── README.md                  # Ce fichier
```

---

## ✨ Fonctionnalités

### 📝 Formulaire d'ajout
- N° Compte, Nom Client, Nom Banque
- Montant, Date, Taux du prêt
- Validation côté client
- Notification de confirmation

### 📊 Tableau des prêts
- Affichage dynamique et responsive
- Colonnes : N° Compte, Nom Client, Banque, Montant, Date, Taux, **Montant à Payer**
- Montant à Payer = Montant × (1 + Taux)

### ✏️ Modifier un prêt
- Modal d'édition au clic du bouton "Modifier"
- Mise à jour immédiate en base de données
- Synchronisation automatique du tableau

### 🗑️ Supprimer un prêt
- Confirmation avant suppression
- Mise à jour en temps réel

### 📈 Statistiques
- **Total à Payer** : Somme de tous les montants
- **Montant Minimal** : Plus petit montant
- **Montant Maximal** : Plus grand montant
- Mise à jour en temps réel

### 📊 Graphiques interactifs
- **Histogramme** : Montants à payer par client
- **Camembert** : Distribution des montants
- Powered by Chart.js

---

## 🔌 API REST

### Base URL
```
http://localhost:3000/api
```

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/pret` | Récupérer tous les prêts |
| POST | `/pret` | Créer un nouveau prêt |
| GET | `/pret/:id_pret` | Récupérer un prêt |
| PUT | `/pret/:id_pret` | Mettre à jour un prêt |
| DELETE | `/pret/:id_pret` | Supprimer un prêt |

### Exemple : Créer un prêt

```bash
curl -X POST http://localhost:3000/api/pret \
  -H "Content-Type: application/json" \
  -d '{
    "num_compte": "ACC001",
    "nom_client": "Jean Dupont",
    "nom_banque": "BNP Paribas",
    "montant": 10000,
    "date_pret": "2024-01-15",
    "taux_pret": 0.045
  }'
```

### Réponse
```json
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
```

---

## 📦 Dépendances

| Package | Rôle |
|---------|------|
| `express` | Framework web |
| `mysql` | Driver MySQL |
| `ejs` | Moteur de template |
| `dotenv` | Variables d'environnement |
| `cors` | Autorisation CORS |
| `nodemon` | Redémarrage auto (dev) |

---

## ⚙️ Configuration

### Fichier `.env`

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=pret_bancaire
```

**Note** : Si MySQL a un mot de passe, mettez-le dans `DATABASE_PASSWORD`.

### Variables disponibles

| Variable | Défaut | Description |
|----------|--------|-------------|
| `PORT` | 3000 | Port du serveur |
| `DATABASE_HOST` | localhost | Adresse MySQL |
| `DATABASE_USER` | root | Utilisateur MySQL |
| `DATABASE_PASSWORD` | (vide) | Mot de passe MySQL |
| `DATABASE_NAME` | pret_bancaire | Nom de la base de données |

---

## 🗄️ Base de données

La table `pret_bancaire` contient les colonnes suivantes :

| Colonne | Type | Contrainte |
|---------|------|-----------|
| `id_pret` | INT | PRIMARY KEY, AUTO_INCREMENT |
| `num_compte` | VARCHAR(20) | NOT NULL |
| `nom_client` | VARCHAR(100) | NOT NULL |
| `nom_banque` | VARCHAR(100) | NOT NULL |
| `montant` | DECIMAL(12,2) | NOT NULL |
| `date_pret` | DATE | NOT NULL |
| `taux_pret` | DECIMAL(5,4) | NOT NULL |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

**Indices** :
- `idx_num_compte` : sur `num_compte`
- `idx_nom_client` : sur `nom_client`

---

## 📝 Scripts npm

```bash
npm run dev       # Démarrer en mode développement (nodemon)
npm start         # Démarrer en mode production
npm install       # Installer les dépendances
```

---

## 🐳 Docker (Optionnel)

Pour lancer l'application avec Docker (MySQL inclus) :

```bash
docker-compose up
```

Voir [DOCKER.md](./DOCKER.md) pour les détails.

---

## 🆘 Dépannage

### Erreur : "Access denied for user 'root'@'localhost'"
- Vérifiez que MySQL est lancé
- Vérifiez les identifiants dans `.env`
- Consultez [INSTALLATION.md](./INSTALLATION.md#dépannage)

### Erreur : "Cannot find module 'mysql'"
```bash
npm install mysql
```

### Erreur : "Port 3000 already in use"
Changez `PORT` dans `.env` à un autre port (ex: 3001).

### Voir plus de solutions
Consultez [INSTALLATION.md](./INSTALLATION.md) pour un guide complet.

---

## 📚 Documentation complète

- 📖 [Installation détaillée](./INSTALLATION.md)
- 🎨 [Frontend](./views/FRONTEND.md)
- 🐳 [Docker & Orchestration](./DOCKER.md)

---

## 🛠️ Technologie

- **Backend** : Node.js, Express.js
- **Frontend** : EJS, CSS3, JavaScript ES6+
- **Graphiques** : Chart.js
- **Base de données** : MySQL
- **Conteneurisation** : Docker (optionnel)

---

## 📄 Licence

Projet pédagogique ENI L3

---

## 👨‍💻 Support

Pour des problèmes ou questions, consultez les fichiers de documentation ou vérifiez les logs de l'application.

- Le code attend une base MySQL accessible via `config/db.js`.
- Les contrôleurs utilisent `pretModel` pour exécuter les requêtes SQL.
- Les erreurs serveur renvoient un status `500` avec un message JSON.
