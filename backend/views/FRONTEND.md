# 🎨 Frontend - Gestion des Prêts Bancaires

Documentation complète du frontend EJS de l'application.

## Table des matières

1. [Description](#description)
2. [Architecture](#architecture)
3. [Fonctionnalités](#fonctionnalités)
4. [Structure des fichiers](#structure-des-fichiers)
5. [Guide d'utilisation](#guide-dutilisation)
6. [Formules de calcul](#formules-de-calcul)
7. [Technologies](#technologies)

---

## 📝 Description

Le frontend EJS offre une interface complète et responsive pour gérer les prêts bancaires. Il permet de :

- ✅ Ajouter de nouveaux prêts
- ✅ Voir tous les prêts dans un tableau dynamique
- ✅ Modifier les prêts existants
- ✅ Supprimer des prêts
- ✅ Visualiser les statistiques en temps réel
- ✅ Consulter des graphiques interactifs

---

## 🏗️ Architecture

### Stack technologique

| Technologie | Rôle |
|------------|------|
| **EJS** | Moteur de template côté serveur |
| **HTML5** | Structure sémantique |
| **CSS3** | Design responsive et animations |
| **JavaScript ES6+** | Interactivité côté client |
| **Chart.js** | Graphiques interactifs |
| **Fetch API** | Communication avec le backend |

### Flux de données

```
┌─────────────────┐
│   views/index.ejs│  ← EJS Template
│  ├─ Formulaire
│  ├─ Tableau
│  ├─ Statistiques
│  ├─ Graphiques
│  └─ Modal édition
└────────┬────────┘
         │
    ┌────▼─────┐
    │  public/js/app.js  │  ← JavaScript client
    │  ├─ CRUD
    │  ├─ Validation
    │  ├─ Charts
    │  └─ Notifications
    └────┬──────┘
         │
    ┌────▼──────────┐
    │  /api/pret    │  ← Backend API
    │  ├─ GET
    │  ├─ POST
    │  ├─ PUT
    │  └─ DELETE
    └────┬──────────┘
         │
    ┌────▼──────────┐
    │  MySQL DB     │  ← Base de données
    └───────────────┘
```

---

## ✨ Fonctionnalités

### 1. 📝 Formulaire d'ajout

**Localisation** : Section "Ajouter un prêt" (sidebar)

**Champs** :
- N° Compte (text)
- Nom Client (text)
- Nom Banque (text)
- Montant (number, step 0.01)
- Date Prêt (date)
- Taux Prêt (number, step 0.0001)

**Validation** :
- Tous les champs sont obligatoires
- Les nombres sont validés côté client
- Validation côté serveur également

**Comportement** :
- ✅ Envoi en JSON via Fetch API
- ✅ Ajout immédiat au tableau
- ✅ Mise à jour des graphiques et statistiques
- ✅ Notification de confirmation
- ✅ Réinitialisation du formulaire

### 2. 📊 Tableau des prêts

**Colonnes** :
1. N° Compte
2. Nom Client
3. Nom Banque
4. Montant (€)
5. Date Prêt (format français)
6. Taux (%)
7. Montant à Payer (€)
8. Actions

**Montant à Payer** :
- Calculé automatiquement
- Formule : `Montant × (1 + Taux)`
- Exemple : 10000 × (1 + 0.05) = 10500

**Actions** :
- 📝 **Modifier** : Ouvre le modal d'édition
- 🗑️ **Supprimer** : Supprime avec confirmation

**Responsive** :
- Desktop : Tableau complet
- Tablette : Scroll horizontal si nécessaire
- Mobile : Optimisé avec scroll

### 3. ✏️ Modifier un prêt

**Déclenchement** : Clic sur bouton "Modifier"

**Modal** :
- Formulaire identique à l'ajout
- ID caché pour identifier le prêt
- Boutons : Enregistrer / Annuler

**Comportement** :
- ✅ Récupération des données existantes
- ✅ Formatage de la date en YYYY-MM-DD
- ✅ Mise à jour immédiate en base de données
- ✅ Fermeture du modal après succès
- ✅ Mise à jour du tableau, graphiques, statistiques

### 4. 🗑️ Supprimer un prêt

**Déclenchement** : Clic sur bouton "Supprimer"

**Confirmation** : Popup standard du navigateur

**Comportement** :
- ✅ Suppression en base de données
- ✅ Retrait immédiat du tableau
- ✅ Mise à jour des graphiques et statistiques
- ✅ Notification de succès

### 5. 📈 Statistiques

**Affichage** : Trois cartes au-dessus du tableau

**Statistiques** :
- **Total à Payer** : Somme de tous les montants à payer
- **Montant Minimal** : Plus petit montant à payer
- **Montant Maximal** : Plus grand montant à payer

**Mise à jour** :
- ✅ Lors du chargement initial
- ✅ Après ajout
- ✅ Après modification
- ✅ Après suppression

### 6. 📊 Graphiques

**Type 1 : Histogramme (Barres)**
- Axe X : Noms des clients
- Axe Y : Montants à payer (€)
- Couleur : Bleu/Indigo
- Interactions : Hover pour voir les valeurs

**Type 2 : Camembert (Doughnut)**
- Part pour chaque client
- Couleurs variées et distinctes
- Légende en bas
- Interactions : Hover pour voir les pourcentages

**Mise à jour** :
- ✅ Automatique après ajout/modification/suppression
- ✅ Labels = Noms des clients
- ✅ Data = Montants à payer

---

## 📂 Structure des fichiers

### `views/index.ejs`

**Structure HTML** :

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Métadonnées et styles -->
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <div class="app-container">
      <!-- Sidebar (navigation) -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a class="nav-link active" data-section="dashboard">Dashboard</a>
          <a class="nav-link" data-section="liste">Liste des prêts</a>
          <a class="nav-link" data-section="ajout">Ajouter un prêt</a>
        </nav>
      </aside>

      <!-- Contenu principal -->
      <main class="main-content">
        <!-- Dashboard avec stats et graphiques -->
        <section id="dashboard" class="content-section active">
          <div class="summary-section"><!-- 3 cartes de stats --></div>
          <div class="charts-section"><!-- 2 graphiques --></div>
        </section>

        <!-- Liste des prêts -->
        <section id="liste" class="content-section">
          <table id="pretsTable"><!-- Tableau dynamique --></table>
        </section>

        <!-- Formulaire d'ajout -->
        <section id="ajout" class="content-section">
          <form id="pretForm"><!-- Formulaire --></form>
        </section>
      </main>
    </div>

    <!-- Modal d'édition -->
    <div id="editModal" class="modal">
      <form id="editForm"><!-- Formulaire édition --></form>
    </div>

    <script src="/js/app.js"></script>
  </body>
</html>
```

### `public/css/style.css`

**Sections principales** :
- Variables CSS (couleurs, espacements)
- Layout responsive (flexbox, grid)
- Components (cards, boutons, formulaires)
- Animations (transitions, keyframes)
- Responsive design (media queries)

**Palette de couleurs** :
```css
--primary: #666eea    /* Indigo */
--secondary: #764ba2  /* Purple */
--success: #27ae60    /* Vert */
--danger: #e74c3c     /* Rouge */
--info: #3498db       /* Bleu */
```

### `public/js/app.js`

**Fonctions principales** :

```javascript
// Initialisation
initCharts()              // Créer les graphiques Chart.js
loadPrets()              // Charger les prêts au démarrage

// Gestion du formulaire d'ajout
pretForm.addEventListener('submit', ...)
addRowToTable(pret)      // Ajouter une ligne au tableau
formatDateFR(dateStr)    // Formater la date en français

// Gestion du modal d'édition
editPret(id)             // Ouvrir le modal
editForm.addEventListener('submit', ...)
updateRowInTable(pret)   // Mettre à jour une ligne

// Suppression
deletePret(id)           // Supprimer un prêt

// Statistiques et graphiques
updateStats()            // Mettre à jour les cartes
updateCharts()           // Mettre à jour les graphiques

// Notifications
showNotification(msg, type) // Afficher une notification
```

---

## 👥 Guide d'utilisation

### Ajouter un prêt

1. Cliquer sur "Ajouter un prêt" (sidebar)
2. Remplir tous les champs
3. Cliquer sur "Ajouter"
4. Le prêt apparaît immédiatement dans le tableau
5. Les graphiques se mettent à jour automatiquement

### Modifier un prêt

1. Cliquer sur le bouton "Modifier" dans la ligne du prêt
2. Le modal s'affiche avec les données actuelles
3. Modifier les champs souhaités
4. Cliquer sur "Enregistrer"
5. Le tableau se met à jour automatiquement

### Supprimer un prêt

1. Cliquer sur le bouton "Supprimer" dans la ligne du prêt
2. Confirmer la suppression dans la popup
3. Le prêt est supprimé immédiatement

### Consulter le dashboard

1. Cliquer sur "Dashboard" (sidebar)
2. Voir les 3 statistiques (Total, Min, Max)
3. Consulter les deux graphiques

### Navigation

- **Sidebar** : Cliquer sur les liens pour naviguer
- **Responsive** : Sidebar collapsible sur mobile
- **État actif** : Mis en évidence avec couleur

---

## 📐 Formules de calcul

### Montant à Payer

```
Montant à Payer = Montant × (1 + Taux)
```

**Exemple** :
```
Montant = 10 000 €
Taux = 0.05 (5%)
Montant à Payer = 10 000 × (1 + 0.05) = 10 500 €
```

### Statistiques

**Total à Payer** :
```
Total = Σ(Montant à Payer pour chaque prêt)
```

**Montant Minimal** :
```
Minimal = min(Montant à Payer de tous les prêts)
```

**Montant Maximal** :
```
Maximal = max(Montant à Payer de tous les prêts)
```

---

## 🛠️ Technologies

### Frontend

| Technologie | Version | Rôle |
|------------|---------|------|
| **HTML5** | - | Markup |
| **CSS3** | - | Styling |
| **JavaScript** | ES6+ | Interactivité |
| **EJS** | - | Templates |
| **Chart.js** | 3.x | Graphiques |
| **Fetch API** | Standard | HTTP requests |

### Bibliothèques CSS/JS

- **Font Awesome** : Icons (CDN)
- **Chart.js** : Graphiques (CDN)

### Navigateurs supportés

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS, Android)

---

## 📱 Responsive Design

### Breakpoints

```css
Desktop   : ≥ 1024px
Tablette  : 768px - 1023px
Mobile    : < 768px
```

### Optimisations

- ✅ Sidebar responsive (collapse on mobile)
- ✅ Tableau scrollable sur petit écran
- ✅ Formulaires full-width sur mobile
- ✅ Cartes de stats empilées sur mobile
- ✅ Graphiques responsifs

---

## 🎯 Formatage des données

### Dates

**Format stockage** : `YYYY-MM-DD` (ISO)

**Format affichage** : `lundi 15 janvier 2024` (français long)

**Fonction** :
```javascript
function formatDateFR(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
```

### Montants

**Format stockage** : Nombre décimal (12,2)

**Format affichage** : `10500.00 €`

**Formatage** :
```javascript
montant.toFixed(2)  // 2 décimales
```

### Taux

**Format stockage** : Décimal (0.05 = 5%)

**Format affichage** : Pourcentage (5.00 %)

**Formatage** :
```javascript
(taux * 100).toFixed(2)  // Convertir en pourcentage
```

---

## 🔐 Sécurité

### Validations côté client

- ✅ Champs obligatoires
- ✅ Validation des types (number, date, text)
- ✅ Montant > 0
- ✅ Taux >= 0

### Validations côté serveur

- ✅ Re-validation de tous les champs
- ✅ Paramètres d'URL validés
- ✅ Erreurs gérées et loggées

---

## 🐛 Débogage

### Dans la console navigateur

```javascript
// Voir tous les prêts
pretsTable.querySelectorAll('tbody tr')

// Voir un prêt spécifique
document.querySelector('tbody tr[data-id="1"]')

// Voir l'état des graphiques
console.log(barChart)
console.log(doughnutChart)
```

### Logs serveur

Ouvrir la console où `npm run dev` est lancé pour voir les logs.

---

## 📚 Documentation connexe

- 📖 [README.md](../README.md) - Vue d'ensemble
- 📖 [INSTALLATION.md](../INSTALLATION.md) - Installation
- 📖 [DOCKER.md](../DOCKER.md) - Docker

---

## 💡 Conseils de développement

### Ajouter une colonne au tableau

1. Modifier `views/index.ejs` : ajouter une `<th>` et une `<td>`
2. Modifier `public/js/app.js` : ajouter la colonne dans `addRowToTable()`
3. Modifier `public/js/app.js` : ajouter la colonne dans `updateRowInTable()`

### Ajouter une statistique

1. Modifier `pretController.js` : ajouter le calcul
2. Modifier `views/index.ejs` : ajouter une carte `summary-card`
3. Modifier `public/js/app.js` : mettre à jour `updateStats()`

### Ajouter un graphique

1. Modifier `views/index.ejs` : ajouter un canvas
2. Modifier `public/js/app.js` : initialiser le graphique dans `initCharts()`
3. Modifier `public/js/app.js` : mettre à jour dans `updateCharts()`

---

## 👨‍💻 Support

Pour des questions ou problèmes sur le frontend :
1. Vérifiez la console navigateur (F12)
2. Vérifiez les erreurs réseau
3. Consultez les logs serveur
4. Lisez les commentaires dans le code
