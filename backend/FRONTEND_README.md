# 🏦 Gestion des Prêts Bancaires - Frontend EJS

## Description

Ce frontend EJS offre une interface complète pour gérer les prêts bancaires avec :

### ✨ Fonctionnalités principales

1. **📝 Ajouter un prêt** : Formulaire pour ajouter de nouveaux prêts avec les informations suivantes :
   - N° Compte
   - Nom du Client
   - Nom de la Banque
   - Montant du prêt
   - Date du prêt
   - Taux du prêt (en %)

2. **📊 Tableau des prêts** : Affichage de tous les prêts avec :
   - N° Compte, Nom Client, Nom Banque
   - Montant du prêt
   - Date du prêt
   - Taux du prêt
   - **Montant à Payer** (calculé automatiquement : Montant × (1 + Taux))

3. **✏️ Modifier un prêt** : Cliquez sur le bouton "Modifier" pour mettre à jour les informations d'un prêt

4. **🗑️ Supprimer un prêt** : Supprimez un prêt avec confirmation

5. **📈 Statistiques** : Affichage des totaux en bas du tableau :
   - **Total à Payer** : Somme de tous les montants à payer
   - **Montant Minimal** : Le plus petit montant à payer
   - **Montant Maximal** : Le plus grand montant à payer

6. **📊 Graphiques** :
   - **Histogramme (Barres)** : Visualisation des montants à payer par client
   - **Camembert (Doughnut)** : Distribution des montants à payer

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MySQL (ou base de données compatible)

### Étapes d'installation

1. **Installer les dépendances** :
```bash
cd backend
npm install
```

2. **Configurer l'environnement** :
Créez un fichier `.env` à la racine du dossier `backend` :
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pret_bancaire
```

3. **Créer la base de données** :
```sql
CREATE DATABASE pret_bancaire;

USE pret_bancaire;

CREATE TABLE Pret_bancaire (
    id_pret INT PRIMARY KEY AUTO_INCREMENT,
    num_compte VARCHAR(20) NOT NULL,
    nom_client VARCHAR(100) NOT NULL,
    nom_banque VARCHAR(100) NOT NULL,
    montant DECIMAL(12, 2) NOT NULL,
    date_pret DATE NOT NULL,
    taux_pret DECIMAL(5, 4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Lancer le serveur** :
```bash
npm run dev
```

5. **Accéder à l'application** :
Ouvrez votre navigateur et accédez à `http://localhost:3000`

## Structure des fichiers

```
backend/
├── views/
│   └── index.ejs          # Template HTML principal
├── public/
│   ├── css/
│   │   └── style.css      # Feuille de styles
│   └── js/
│       └── app.js         # Logique JavaScript côté client
├── routes/
│   └── pretRoutes.js      # Définition des routes API
├── controller/
│   └── pretController.js  # Contrôleurs des prêts
├── models/
│   └── pretModel.js       # Modèle de données
├── config/
│   └── db.js              # Configuration base de données
├── app.js                 # Configuration Express
├── server.js              # Point d'entrée
└── package.json           # Dépendances
```

## Formule de calcul

**Montant à Payer = Montant du Prêt × (1 + Taux du Prêt)**

Exemple : Un prêt de 10 000€ avec un taux de 0.05 (5%)
- Montant à Payer = 10 000 × (1 + 0.05) = 10 500€

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/pret` | Récupérer tous les prêts |
| POST | `/api/pret` | Créer un nouveau prêt |
| GET | `/api/pret/:id_pret` | Récupérer un prêt spécifique |
| PUT | `/api/pret/:id_pret` | Mettre à jour un prêt |
| DELETE | `/api/pret/:id_pret` | Supprimer un prêt |

## Technologies utilisées

- **Backend** : Node.js, Express.js
- **Frontend** : EJS (Embedded JavaScript Templating)
- **Styling** : CSS3 avec design responsif
- **Graphiques** : Chart.js
- **Base de données** : MySQL
- **HTTP Client** : Fetch API

## Fonctionnalités avancées

✅ Design responsif (fonctionne sur mobile, tablette, desktop)
✅ Animations fluides et transitions
✅ Notifications visuelles (succès/erreur)
✅ Modal de modification
✅ Validation côté client
✅ Graphiques interactifs en temps réel
✅ Statistiques automatiques

## Notes importantes

- Les taux de prêt sont stockés en décimal (0.05 pour 5%)
- L'affichage convertit automatiquement en pourcentage (0.05 → 5%)
- Les montants sont arrondis à 2 décimales
- Tous les graphiques se mettent à jour en temps réel lors de modifications

## Dépannage

### La page ne charge pas
- Vérifiez que le serveur est lancé : `npm run dev`
- Vérifiez que le port 3000 est disponible
- Vérifiez la console du navigateur pour les erreurs

### Les données ne s'affichent pas
- Vérifiez la connexion à la base de données dans `.env`
- Vérifiez que la table `Pret_bancaire` existe
- Consultez les logs du serveur

### Les graphiques ne s'affichent pas
- Vérifiez que Chart.js est chargé (CDN)
- Vérifiez la console du navigateur pour les erreurs

## Licences

Ce projet est fourni à titre d'exemple éducatif.
