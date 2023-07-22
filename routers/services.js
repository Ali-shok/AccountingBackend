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



  router.post('/insertData_service', (req, res) => {
    const { service_name, price, description, category_name } = req.body;
  
    // Get the category ID based on the selected category_name
    const getCategorySQL = 'SELECT id FROM category WHERE name = ?';
  
    // Perform a database query to get the category_id
    db.query(getCategorySQL, [category_name], (err, rows) => {
      if (err) {
        console.error('Error fetching category_id:', err);
        res.status(500).send('Error fetching category_id');
        return;
      }
  
      if (rows.length === 0) {
        // If no matching category found, handle the error
        console.error('Category not found:', category_name);
        res.status(404).send('Category not found');
        return;
      }
  
      const category_id = rows[0].id;
  
      // Perform database insert query
      const insertServiceSQL = 'INSERT INTO service (name, price, description, category_id) VALUES (?, ?, ?, ?)';
      db.query(insertServiceSQL, [service_name, price, description, category_id], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).send('Error inserting data');
          return;
        }
        console.log('Data inserted successfully:', result);
        res.status(200).send('Data inserted successfully');
      });
    });
  });
  

router.delete('/service/:id', (req, res) => {
    const serviceId = req.params.id;
    db.query('DELETE FROM `mydatabase`.`service` WHERE `id` = ?', [serviceId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Service not found' });
        } else {
          res.json({ message: 'Service deleted successfully' });
        }
      }
    });
  });

router.put('/service/:id', (req, res) => {
    const serviceId = req.params.id;
    const { name, price, description ,category_id} = req.body; // Assuming you send the updated service_name, price, and description in the request body
  
    // Perform validation on service_name, price, and description, if required
  
    db.query(
      'UPDATE `mydatabase`.`service` SET `name` = ?, `price` = ?, `description` = ?, `category_id` = ? WHERE `id` = ?',
      [name, price, description, category_id,serviceId],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Service not found' });
          } else {
            res.json({ message: 'Service updated successfully' });
          }
        }
      }
    );
  });
  
  









module.exports = router;