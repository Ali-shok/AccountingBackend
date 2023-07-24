const express = require('express');
const router = express.Router();
const db = require('../db');



router.get('/employee', (req, res) => {
    const query = 'SELECT * FROM employee';
  
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

router.post('/insertData_employee', (req, res) => {
    const { name, email, phoneNumber, hire_date, admin_name, address, employee_kind_name, password, salary,image } = req.body;
  
    // Query to get admin_id based on admin_name
    const getAdminIdSQL = 'SELECT id FROM admin WHERE name = ?';
    db.query(getAdminIdSQL, [admin_name], (err, adminResult) => {
        if (err) {
            console.error('Error fetching admin_id:', err);
            res.status(500).send('Error inserting data');
            return;
        }

        if (adminResult.length === 0) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }

        const admin_id = adminResult[0].id;

        // Query to get employee_kind_id based on employee_kind_name
        const getEmployeeKindIdSQL = 'SELECT id FROM employee_kind WHERE name = ?';
        db.query(getEmployeeKindIdSQL, [employee_kind_name], (err, employeeKindResult) => {
            if (err) {
                console.error('Error fetching employee_kind_id:', err);
                res.status(500).send('Error inserting data');
                return;
            }

            if (employeeKindResult.length === 0) {
                res.status(404).json({ error: 'Employee kind not found' });
                return;
            }

            const employee_kind_id = employeeKindResult[0].id;

            // Perform database insert query
            const insertEmployeeSQL = 'INSERT INTO employee (name, email, phoneNumber, hire_date, admin_id, address, employee_kind_id, password, salary,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
            db.query(insertEmployeeSQL, [name, email, phoneNumber, hire_date, admin_id, address, employee_kind_id, password, salary,image], (err, result) => {
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
});


router.put('/employee/:id', (req, res) => {
    const employeeId = req.params.id;
    const { name, email, phoneNumber, hire_date, admin_name, address, employee_kind_name, password, salary,image } = req.body;
  
    // Query to get admin_id based on admin_name
    const getAdminIdSQL = 'SELECT id FROM admin WHERE name = ?';
    db.query(getAdminIdSQL, [admin_name], (err, adminResult) => {
        if (err) {
            console.error('Error fetching admin_id:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (adminResult.length === 0) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }

        const admin_id = adminResult[0].id;

        // Query to get employee_kind_id based on employee_kind_name
        const getEmployeeKindIdSQL = 'SELECT id FROM employee_kind WHERE name = ?';
        db.query(getEmployeeKindIdSQL, [employee_kind_name], (err, employeeKindResult) => {
            if (err) {
                console.error('Error fetching employee_kind_id:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (employeeKindResult.length === 0) {
                res.status(404).json({ error: 'Employee kind not found' });
                return;
            }

            const employee_kind_id = employeeKindResult[0].id;

            // Perform validation on data, if required

            db.query(
                'UPDATE employee SET name = ?, email = ?, phoneNumber = ?, hire_date = ?, admin_id = ?, address = ?, employee_kind_id = ?, password = ?, salary = ? , image = ? WHERE id = ?',
                [name, email, phoneNumber, hire_date, admin_id, address, employee_kind_id, password, salary, employeeId,image],
                (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        if (result.affectedRows === 0) {
                            res.status(404).json({ error: 'Employee not found' });
                        } else {
                            res.json({ message: 'Employee updated successfully' });
                        }
                    }
                }
            );
        });
    });
});

router.delete('/employee/:id', (req, res) => {
    const employeeId = req.params.id;
    db.query('DELETE FROM employee WHERE id = ?', [employeeId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Employee not found' });
            } else {
                res.json({ message: 'Employee deleted successfully' });
            }
        }
    });
});

module.exports = router;
