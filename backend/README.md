# Backend Express pour gestion de prêts bancaires

Ce backend Node.js/Express fournit une API REST pour gérer des prêts bancaires. Il utilise MySQL pour stocker les données et se compose de routes, contrôleurs et modèles séparés.

## Structure du projet

backend/
├── config/
│   └── db.js               # configuration de la connexion MySQL
├── controller/
│   └── pretController.js   # logique des routes et gestion des requêtes/réponses
├── models/
│   └── pretModel.js        # requêtes SQL vers la table `pret_bancaire`
├── routes/
│   └── pretRoutes.js       # définition des endpoints API
├── app.js                  # configuration Express et middleware
├── server.js               # démarrage du serveur
├── .env                    # variables d'environnement (non versionné)
└── package.json           # dépendances et scripts

## Installation

1. Copier le dépôt ou placer le dossier `backend` sur votre machine.
2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` à la racine du dossier `backend` et ajouter les variables suivantes :

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=votre_utilisateur
DATABASE_PASSWORD=votre_mot_de_passe
DATABASE_NAME=nom_de_la_base
```

4. Démarrer le serveur en mode développement :

```bash
npm run dev
```

Le serveur écoute par défaut sur `http://localhost:3000` ou sur le port défini dans `PORT`.

## Base de données

Ce backend utilise une table MySQL nommée `pret_bancaire`.

Schéma attendu (exemple) :

```sql
CREATE TABLE pret_bancaire (
  id_pret INT AUTO_INCREMENT PRIMARY KEY,
  num_compte VARCHAR(50) NOT NULL,
  nom_client VARCHAR(100) NOT NULL,
  nom_banque VARCHAR(100) NOT NULL,
  montant DECIMAL(12,2) NOT NULL,
  date_pret DATE NOT NULL,
  taux_pret DECIMAL(5,2) NOT NULL
);
```

## API

Toutes les routes sont préfixées par `/api`.

### Endpoints disponibles

- `GET /api/` : message d'accueil
- `GET /api/pret` : liste tous les prêts
- `POST /api/pret` : crée un nouveau prêt
- `GET /api/pret/:id_pret` : récupère un prêt par son identifiant
- `PUT /api/pret/:id_pret` : met à jour un prêt existant
- `DELETE /api/pret/:id_pret` : supprime un prêt

### Exemple de corps de requête pour `POST /api/pret`

```json
{
  " e": "12345678",
  "nom_client": "Dupont",
  "nom_banque": "Banque Exemple",
  "montant": 15000,
  "date_pret": "2026-05-27",
  "taux_pret": 2.5
}
```

## Dépendances principales

- `express` : serveur web
- `mysql` : connexion MySQL
- `dotenv` : gestion des variables d'environnement
- `cors` : autorisation des requêtes cross-origin
- `nodemon` (dev) : redémarrage automatique en développement

## Notes

- Le code attend une base MySQL accessible via `config/db.js`.
- Les contrôleurs utilisent `pretModel` pour exécuter les requêtes SQL.
- Les erreurs serveur renvoient un status `500` avec un message JSON.
