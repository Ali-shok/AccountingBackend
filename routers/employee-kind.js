const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/employee_kind', (req, res) => {
    const query = 'SELECT * FROM employee_kind';
  
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });

router.post('/insertData_employee_kind', (req, res) => {
    const { name } = req.body;
  
    // Perform database insert query
    const insertEmployeeKindSQL = 'INSERT INTO employee_kind (name) VALUES (?)';
    db.query(insertEmployeeKindSQL, [name], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
      } else {
        console.log('Data inserted successfully:', result);
        res.status(200).send('Data inserted successfully');
      }
    });
});

router.put('/employee_kind/:id', (req, res) => {
    const employeeKindId = req.params.id;
    const { name } = req.body; // Assuming you send the updated name in the request body
  
    // Perform validation on name, if required
  
    db.query(
      'UPDATE employee_kind SET name = ? WHERE id = ?',
      [name, employeeKindId],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Employee kind not found' });
          } else {
            res.json({ message: 'Employee kind updated successfully' });
          }
        }
      }
    );
  });

router.delete('/employee_kind/:id', (req, res) => {
    const employeeKindId = req.params.id;
    db.query('DELETE FROM employee_kind WHERE id = ?', [employeeKindId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: 'Employee kind not found' });
        } else {
          res.json({ message: 'Employee kind deleted successfully' });
        }
      }
    });
  });
  
module.exports = router;