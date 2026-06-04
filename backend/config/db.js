// on va mettre la logique de connexion du base de donnée ici
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    connectionLimit: 10, // nombre max de connex simultanées
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

function connectWithRetry(retries = 10, delay = 3000) {
    connection.getConnection((err, conn) => {
        if (err) {
            console.error(`Erreur de connexion (${retries} tentatives restantes):`, err.code);
            if (retries > 0) {
                setTimeout(() => connectWithRetry(retries - 1, delay), delay);
            } else {
                console.error('Impossible de se connecter à la base de données.');
                process.exit(1);
            }
        } else {
            console.log('database connected');
            conn.release();
        }
    });
}

connectWithRetry();

module.exports = connection;