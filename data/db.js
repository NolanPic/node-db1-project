const db = require('./dbConfig');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};

function get(limit = null, sortby = 'id', sortdir = 'asc') {
    return db()
        .from('accounts')
        .select('*')
        .orderBy(sortby, sortdir)
        .limit(limit);
}

function getById(id) {
    return db()
        .from('accounts')
        .select('*')
        .where('id', id)
        .first();
}

function insert(account) {
    return db('accounts')
        .insert(account);
}

function update(id, updates) {
    return db('accounts')
        .where({ id })
        .update(updates);
}

function remove(id) {
    return db('accounts')
        .where({ id })
        .delete();
}
