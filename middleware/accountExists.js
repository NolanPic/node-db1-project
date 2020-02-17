const db = require('../data/db');

const accountExists = (req, res, next) => {
    const { id } = req.params;
    db.getById(id)
        .then(account => {
            if(!account) {
                res.status(404).json({ error: "This account does not exist" });
            }
            else {
                req.account = account;
                next();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Something went wrong getting this account" });
        });
};

module.exports = accountExists;
