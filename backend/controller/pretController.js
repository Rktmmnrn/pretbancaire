// On va mettre ici la logique des traitements des requêtes,, importe le Models
const db = require('../config/db');
const pretmodel = require('../models/pretModel');

const pretController = {
    getAllPret: (req, res) => {
        pretmodel.getAllPret((err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des prêts bancaires:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.json(results);
        });
    },
    createPret: (req, res) => {
        const { num_compte, nom_client, nom_banque, montant, date_pret, taux_pret } = req.body;
        pretmodel.createPret(num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({
                id_pret: result.insertId,
                num_compte,
                nom_client,
                nom_banque,
                montant,
                date_pret,
                taux_pret
            });
        });
    },
    getPretById: (req, res) => {
        const { id_pret } = req.params;
        pretmodel.getPretById(id_pret, (err, results) => {
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
        pretmodel.updatePret(id_pret, num_compte, nom_client, nom_banque, montant, date_pret, taux_pret, (err) => {
            if (err) {
                console.error('Erreur lors de la mise à jour du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.json({ id_pret, num_compte, nom_client, nom_banque, montant, date_pret, taux_pret });
        });
    },
    deletePret: (req, res) => {
        const { id_pret } = req.params;
        pretmodel.deletePret(id_pret, (err) => {
            if (err) {
                console.error('Erreur lors de la suppression du prêt bancaire:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(204).send();
        });
    }
};

// console.log("...pretController");
module.exports = pretController;