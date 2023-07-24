const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/customer', (req, res) => {
    const query = 'SELECT * FROM customer';
  
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

router.post('/insertData_customer', (req, res) => {
    const { name, phone, email, address, note, password, customer_kind_name, image } = req.body;

    // Query to get customer_kind_id based on customer_kind_name
    const getCustomerKindIdSQL = 'SELECT id FROM customer_kind WHERE name = ?';
    db.query(getCustomerKindIdSQL, [customer_kind_name], (err, customerKindResult) => {
        if (err) {
            console.error('Error fetching customer_kind_id:', err);
            res.status(500).send('Error inserting data');
            return;
        }

        if (customerKindResult.length === 0) {
            res.status(404).json({ error: 'Customer kind not found' });
            return;
        }

        const customer_kind_id = customerKindResult[0].id;

        // Perform database insert query
        const insertCustomerSQL = 'INSERT INTO customer (name, phone, email, address, note, password, customer_kind_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(insertCustomerSQL, [name, phone, email, address, note, password, customer_kind_id, image], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error inserting data');
            } else {
                console.log('Data inserted successfully:', result);
                res.status(200).send('Data inserted successfully');
            }
        });
    });
});

router.put('/customer/:id', (req, res) => {
    const customerId = req.params.id;
    const { name, phone, email, address, note, password, customer_kind_name, image } = req.body;

    // Query to get customer_kind_id based on customer_kind_name
    const getCustomerKindIdSQL = 'SELECT id FROM customer_kind WHERE name = ?';
    db.query(getCustomerKindIdSQL, [customer_kind_name], (err, customerKindResult) => {
        if (err) {
            console.error('Error fetching customer_kind_id:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (customerKindResult.length === 0) {
            res.status(404).json({ error: 'Customer kind not found' });
            return;
        }

        const customer_kind_id = customerKindResult[0].id;

        // Perform validation on data, if required

        db.query(
            'UPDATE customer SET name = ?, phone = ?, email = ?, address = ?, note = ?, password = ?, customer_kind_id = ?, image = ? WHERE id = ?',
            [name, phone, email, address, note, password, customer_kind_id, image, customerId],
            (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({ error: 'Customer not found' });
                    } else {
                        res.json({ message: 'Customer updated successfully' });
                    }
                }
            }
        );
    });
});

router.delete('/customer/:id', (req, res) => {
    const customerId = req.params.id;
    db.query('DELETE FROM customer WHERE id = ?', [customerId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Customer not found' });
            } else {
                res.json({ message: 'Customer deleted successfully' });
            }
        }
    });
});

module.exports = router;
