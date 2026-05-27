// Ici les fonctions qui vont parler à MySql
const db = require('../config/db');

const pretModel = {
    getAllPret: (callback) => {
        const sql = 'SELECT * FROM pret_bancaire';
        db.query(sql, callback);
    },
    createPret: (num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, callback) => {
        const sql = 'INSERT INTO pret_bancaire (num_compte, nom_client, nom_banque, montant, date_pret, taux_pret) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [num_compte, nom_client, nom_banque, montant, date_pret, taux_pret], callback);
    },
    getPretById: (id_pret, callback) => {
        const sql = 'SELECT * FROM pret_bancaire WHERE id_pret = ?';
        db.query(sql, [id_pret], callback);
    },
    updatePret: (id_pret, num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, callback) => {
        const sql = 'UPDATE pret_bancaire SET num_compte = ?, nom_client = ?, nom_banque = ?, montant = ?, date_pret = ?, taux_pret = ? WHERE id_pret = ?';
        db.query(sql, [num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, id_pret], callback);
    },
    deletePret: (id_pret, callback) => {
        const sql = 'DELETE FROM pret_bancaire WHERE id_pret = ?';
        db.query(sql, [id_pret], callback);
    }
};

// console.log("...pretModel");
module.exports = pretModel;