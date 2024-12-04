const db = require('../models/db');

// GET all items
const getItems = (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.render('index', { items: rows });
    });
};

// POST: Add a new item
const addItem = (req, res) => {
    const { name, description } = req.body;
    db.run(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/');
        }
    );
};

// PUT: Update an item
const updateItem = (req, res) => {
    const { id, name, description } = req.body;
    db.run(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.redirect('/');
        }
    );
};

// DELETE: Remove an item
const deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/');
    });
};

module.exports = { getItems, addItem, updateItem, deleteItem };
