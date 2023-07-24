const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/admin', (req, res) => {
    db.query('SELECT * FROM `mydatabase`.`admin`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });




  module.exports = router;

