const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    // Retrieve data from the table
    db.query('SELECT * FROM `mydatabase`.`cost_paid`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  router.get('/cost_to_pay', (req, res) => {
    // Retrieve data from the table
    db.query('SELECT * FROM `mydatabase`.`cost_to_pay`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  router.get('/income_to_take', (req, res) => {
    // Retrieve data from the table
    db.query('SELECT * FROM `mydatabase`.`income_to_take`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  



  
  module.exports = router;
