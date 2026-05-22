## introduction
this project is about a bank loan with express js backend
I'm going to de this project without IA for first time

## structure du projet
backend/
├── config/
│   └── db.js               // parle à MySQL
├── controller/
│   └── pretController.js   // parle au Client, importe le Model, gère req/res
├── models/
│   └── pretModel.js        // importe db et éxecute les requetes SQL
├── routes/
│   └── pretRoutes.js       // importe le Controller et défini les urls
├── app.js                  // importe les Routes et config express
├── server.js               // importe App et lance le port
├── .env
└── package.json

## APIs
Les routes sont préfixé par /api
/api => racine
/api/pret => requête GET

## but