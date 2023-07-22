const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all customer kinds
router.get('/customer_kind', (req, res) => {
    const query = 'SELECT * FROM customer_kind';

    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// Insert a new customer kind
router.post('/insertData_customer_kind', (req, res) => {
    const { name } = req.body;

    // Perform database insert query
    const insertCustomerKindSQL = 'INSERT INTO customer_kind (name) VALUES (?)';
    db.query(insertCustomerKindSQL, [name], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
        } else {
            console.log('Data inserted successfully:', result);
            res.status(200).send('Data inserted successfully');
        }
    });
});

// Update an existing customer kind by ID
router.put('/customer_kind/:id', (req, res) => {
    const customerKindId = req.params.id;
    const { name } = req.body; // Assuming you send the updated name in the request body

    // Perform validation on name, if required

    db.query(
        'UPDATE customer_kind SET name = ? WHERE id = ?',
        [name, customerKindId],
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Customer kind not found' });
                } else {
                    res.json({ message: 'Customer kind updated successfully' });
                }
            }
        }
    );
});

// Delete a customer kind by ID
router.delete('/customer_kind/:id', (req, res) => {
    const customerKindId = req.params.id;
    db.query('DELETE FROM customer_kind WHERE id = ?', [customerKindId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Customer kind not found' });
            } else {
                res.json({ message: 'Customer kind deleted successfully' });
            }
        }
    });
});

module.exports = router;
