const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/service', (req, res) => {
  const query = `
  SELECT
    service.id,
    service.name AS service_name,
    service.description,
    service.price,
    category.name AS category_name
FROM
    mydatabase.service
JOIN
    mydatabase.category ON service.category_id = category.id;
`
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });




 














module.exports = router;