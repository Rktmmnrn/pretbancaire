const app = require('./app');
require('dotenv').config(); // pour charger les variables d'environnement depuis le fichier .env
const port = 3000 || process.env.PORT;
const db = require('./config/db');

app.listen(port, () => {
    console.log(`L'app écoute sur le port: ${port} actuellement`);
})