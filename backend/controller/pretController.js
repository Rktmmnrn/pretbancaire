// On va mettre ici la logique des traitements des requêtes
const db = require('../config/db');

const pretController = {
    getAllPret: (req, res) => {
        const sql = 'SELECT * FROM pret_bancaire';
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des prêts bancaires:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.json(results);
        });
    },
    createPret: (req, res) => {
        const { num_compte, nom_client, nom_banque, montant, date_pret, taux_pret } = req.body;
        const sql = 'INSERT INTO pret_bancaire (num_compte, nom_client, nom_banque, montant, date_pret, taux_pret) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [num_compte, nom_client, nom_banque, montant, date_pret, taux_pret], (err, result) => {
            if (err) {
                console.error('Erreur lors de la création du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({ id_pret: result.insertId, num_compte, nom_client, nom_banque, montant, date_pret, taux_pret });
        });
    },
    getPretById: (req, res) => {
        const { id_pret } = req.params;
        const sql = 'SELECT * FROM pret_bancaire WHERE id_pret = ?';
        db.query(sql, [id_pret], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Prêt bancaire non trouvé' });
            }
            res.json(results[0]);
        });
    },
    updatePret: (req, res) => {
        const { id_pret } = req.params;
        const { num_compte, nom_client, nom_banque, montant, date_pret, taux_pret } = req.body;
        const sql = 'UPDATE pret_bancaire SET num_compte = ?, nom_client = ?, nom_banque = ?, montant = ?, date_pret = ?, taux_pret = ? WHERE id_pret = ?';
        db.query(sql, [num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, id_pret], (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.json({ id_pret, num_compte, nom_client, nom_banque, montant, date_pret, taux_pret });
        });
    },
    deletePret: (req, res) => {
        const { id_pret } = req.params;
        const sql = 'DELETE FROM pret_bancaire WHERE id_pret = ?';
        db.query(sql, [id_pret], (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(204).send();
        });
    }
};

console.log("...pretController");
module.exports = pretController;