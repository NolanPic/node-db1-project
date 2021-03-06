const express = require('express');

const db = require('./data/db');
const accountExists = require('./middleware/accountExists');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    const { limit, sortby, sortdir } = req.query;

    db.get(limit, sortby, sortdir)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting accounts" });
        });
});

server.get('/accounts/:id', accountExists, (req, res) => {
    res.status(200).json(req.account);
});

server.post('/accounts', (req, res) => {
    const account = req.body;

    db.insert(account)
        .then(inserted => {
            return db.getById(inserted[0])
                .then(newAccount => res.status(201).json(newAccount));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong creating this account" });
        });
});

server.put('/accounts/:id', accountExists, (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    db.update(id, updates)
        .then(() => {
            return db.getById(id)
                .then(updatedAccount => {
                    res.status(200).json(updatedAccount);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong updating this account" });
        });
});

server.delete('/accounts/:id', accountExists, (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong deleting this account" });
        });
});

module.exports = server;
