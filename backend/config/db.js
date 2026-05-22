// on va mettre la logique de connexion du base de donnée ici
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createPool({
    connectionLimit: 10, // nombre max de connex simultanées
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

connection.getConnection((err, conn) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        connection.state = 'database error';
    } else {
        connection.state = 'database connected';
        conn.release(); // libérer la connexion après utilisation
    }
    console.log(connection.state);
});

module.exports = connection;