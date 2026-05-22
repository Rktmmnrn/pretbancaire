require('dotenv').config(); // pour charger les variables d'environnement depuis le fichier .env
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`L'app écoute sur le port: ${port} actuellement`);
})