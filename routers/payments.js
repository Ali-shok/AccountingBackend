const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    // Retrieve data from the table
    db.query('SELECT * FROM `mydatabase`.`cost_paid`ORDER BY payment_id DESC', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  router.get('/cost_to_pay', (req, res) => {
    db.query('SELECT * FROM `mydatabase`.`cost_to_pay` ORDER BY payment_id DESC', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  router.get('/income_to_take', (req, res) => {
    db.query('SELECT * FROM `mydatabase`.`income_to_take`ORDER BY payment_id DESC', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });

  router.get('/income_taken', (req, res) => {
    db.query('SELECT * FROM `mydatabase`.`income_taken`ORDER BY payment_id DESC', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  





  module.exports = router;
