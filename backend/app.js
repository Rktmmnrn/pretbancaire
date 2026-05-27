const express = require('express');
const app = express();
const pretRoutes = require('./routes/pretRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', pretRoutes); // préfixé les routes

// console.log("...app");
module.exports = app;