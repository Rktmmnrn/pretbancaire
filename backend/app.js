const express = require('express');
const app = express();
const pretRoutes = require('./routes/pretRoutes');

app.use(express.json());
app.use('/', pretRoutes); // préfixé les routes

console.log("...app");
module.exports = app;