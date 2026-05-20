const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fenohery',
    password: 'admin',
    database: 'pretbancaire'
})

connection.connect(); // connection

const data = [
    {id: 1, name: "jean"},
    {id: 2, name: "bas"},
    {id: 3, name: "koto"},
    {id: 4, name: "Hajo"}
]

app.get("/", (req, res) => {
    res.status(200).send("Hi...!");
    console.log(connection.state);
    connection.query("SELECT * FROM Pret_bancaire;", (err, rows, fields) => {
        if (err) throw err;
        console.log("Ici : ", rows);
    });
})

app.get("/users", (req, res) => {
    console.log();
    res.status(200).send(data);
})

app.get("/users/:id", (req, res) => {
    const parsedId = req.params.id;
    const findData = data.find((user) => user.id === parseInt(parsedId)); //recherche des données
    if (!findData) {
        if (isNaN(parsedId)) {
            // console.log(findData);
            return res.status(400).send('Bad request');
        };
        return res.status(404).send('Data not found')
    }
    // console.log(data[parsedId].id);
    return res.status(200).send(findData);
})

// connection.end();

// connection.destroy(); // deconnection
app.listen(port, () => {
    console.log(`L'app écoute sur le port: ${port} actuellement`)
})