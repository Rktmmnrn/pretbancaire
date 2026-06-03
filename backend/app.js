const express = require('express');
const app = express();
const pretRoutes = require('./routes/pretRoutes');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', pretRoutes); // préfixé les routes

// Route pour afficher la page d'accueil avec le formulaire et le tableau
const pretController = require('./controller/pretController');
app.get('/', pretController.getPage);

// console.log("...app");
module.exports = app;