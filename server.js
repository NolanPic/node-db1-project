const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db()
    .from('accounts')
    .select('*')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Something went wrong getting accounts" });
    });
});

module.exports = server;
