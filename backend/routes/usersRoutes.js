// ici on va mettre les routes
const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');

// router.get('/users', usersController.getAllUsers);
// router.post('/users', usersController.createUser);
// router.get('/users/:id', usersController.getUserById);
// router.put('/users/:id', usersController.updateUser);
// router.delete('/users/:id', usersController.deleteUser);

module.exports = router;