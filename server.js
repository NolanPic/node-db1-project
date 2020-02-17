const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db.get()
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting accounts" });
        });
});

server.get('/accounts/:id', (req, res) => {
    const { id } = req.params;

    db.getById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting this account" });
        });
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

server.put('/accounts/:id', (req, res) => {
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

server.delete('/accounts/:id', (req, res) => {
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
