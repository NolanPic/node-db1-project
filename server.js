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

server.get('/accounts/:id', (req, res) => {
    const { id } = req.params;

    getById(id)
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

    db('accounts')
        .insert(account)
        .then(inserted => {
            return getById(inserted[0])
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

    db('accounts')
        .where({ id })
        .update(updates)
        .then(() => {
            return getById(id)
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

    db('accounts')
        .where({ id })
        .delete()
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong deleting this account" });
        });
});

module.exports = server;

function getById(id) {
    return db()
        .from('accounts')
        .select('*')
        .where('id', id)
        .first();
}
