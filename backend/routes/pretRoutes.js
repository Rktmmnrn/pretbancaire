// ici on va mettre les routes
const express = require('express');
const router = express.Router();

const pretController = require('../controller/pretController');

router.get('/', (req, res) => {
    res.send('Salut toi...');
});
router.get('/pret', pretController.getAllPret);
router.post('/pret', pretController.createPret);
router.get('/pret/:id_pret', pretController.getPretById);
router.put('/pret/:id_pret', pretController.updatePret);
router.delete('/pret/:id_pret', pretController.deletePret);

console.log("...pretRoutes");
module.exports = router;