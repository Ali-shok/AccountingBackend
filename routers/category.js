const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/category', (req, res) => {
    db.query('SELECT `category`.`id` ,`category`.`name`,`category`.`note` FROM `mydatabase`.`category`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });

 

router.post('/insertData_category', (req, res) => {
    const { name, note } = req.body;
  
    // Perform database insert query
    const sql = 'INSERT INTO category (name, note) VALUES (?, ?)';
    db.query(sql, [name, note], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted successfully:', result);
      res.status(200).send('Data inserted successfully');
    });
  });


  // Update a category
router.put('/category/:id', (req, res) => {
    const categoryId = req.params.id;
    const { name, note } = req.body; // Assuming you send the updated name and note in the request body
  
    // Perform validation on name and note, if required
  
    db.query(
      'UPDATE `mydatabase`.`category` SET `name` = ?, `note` = ? WHERE `id` = ?',
      [name, note, categoryId],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Category not found' });
          } else {
            res.json({ message: 'Category updated successfully' });
          }
        }
      }
    );
  });

router.delete('/category/:id', (req, res) => {
    const categoryId = req.params.id;
    db.query('DELETE FROM `mydatabase`.`category` WHERE `id` = ?', [categoryId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Category not found' });
        } else {
          res.json({ message: 'Category deleted successfully' });
        }
      }
    });
  });


  



module.exports = router;
