const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = `SELECT
  cost_paid.payment_id,
  cost_paid.title,
  cost_paid.amount,
  cost_paid.payment_date,
  cost_paid.note,
  employee.name AS emp_name,
  payment_kind.name AS pp
FROM
  cost_paid
JOIN
  employee ON cost_paid.employee_id = employee.id
JOIN
  payment_kind ON cost_paid.payment_kind_id = payment_kind.id
ORDER BY
  cost_paid.payment_id DESC;
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
  
  router.get('/cost_to_pay', (req, res) => {
    const query = `SELECT
    cost_to_pay.payment_id,
    cost_to_pay.title,
    cost_to_pay.amount,
    cost_to_pay.payment_date,
    cost_to_pay.note,
    employee.name AS emp_name,
    payment_kind.name AS pp
  FROM
    cost_to_pay
  JOIN
    employee ON cost_to_pay.employee_id = employee.id
  JOIN
    payment_kind ON cost_to_pay.payment_kind_id = payment_kind.id
  ORDER BY
    cost_to_pay.payment_id DESC;
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
  
  router.get('/income_to_take', (req, res) => {
    const query = `
      SELECT
        income_to_take.payment_id,
        income_to_take.title,
        income_to_take.amount,
        income_to_take.payment_date,
        income_to_take.note,
        employee.name AS emp_name,
        service.name AS service_name,
        customer.name AS customer_name
      FROM
        income_to_take
      JOIN
        employee ON income_to_take.employee_id = employee.id
      JOIN
        service ON income_to_take.service_id = service.id
      JOIN
        customer ON income_to_take.customer_id = customer.id
      ORDER BY
        income_to_take.payment_id DESC
    `;
  
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });
  

  router.get('/income_taken', (req, res) => {

    const query = `SELECT
    income_taken.payment_id,
    income_taken.title,
    income_taken.amount,
    income_taken.payment_date,
    income_taken.note,
    employee.name AS emp_name,
    service.name AS service_name,
    customer.name AS customer_name
FROM
    income_taken
JOIN
    employee ON income_taken.employee_id = employee.id
JOIN
    service ON income_taken.service_id = service.id
JOIN
    customer ON income_taken.customer_id = customer.id
ORDER BY
    income_taken.payment_id DESC;
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
  

  router.get('/payment_kind', (req, res) => {
    db.query('SELECT `payment_kind`.`name` ,`payment_kind`.`id` FROM `mydatabase`.`payment_kind`', (err, rows) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(rows);
      }
    });
  });

  
  router.post('/insertData_cost_paid', (req, res) => {
    const { title, amount, note, employee_name, payment_kind_name } = req.body;
  
    // Validate inputs
    if (!title || !amount || !note || !employee_name || !payment_kind_name) {
      res.status(400).json({ error: 'Please fill in all the required fields.' });
      return;
    }
  
    // Retrieve the employee ID based on the employee name
    const selectEmployeeQuery = 'SELECT id FROM employee WHERE name = ?';
    db.query(selectEmployeeQuery, [employee_name], (err, employeeResult) => {
      if (err) {
        console.error('Error retrieving employee data:', err);
        res.status(500).json({ error: 'An error occurred while retrieving employee data.' });
        return;
      }
  
      if (employeeResult.length === 0) {
        res.status(404).json({ error: 'Employee not found.' });
        return;
      }
  
      const employee_id = employeeResult[0].id;
  
      // Retrieve the payment kind ID based on the payment kind name
      const selectPaymentKindQuery = 'SELECT id FROM payment_kind WHERE name = ?';
      db.query(selectPaymentKindQuery, [payment_kind_name], (err, paymentKindResult) => {
        if (err) {
          console.error('Error retrieving payment kind data:', err);
          res.status(500).json({ error: 'An error occurred while retrieving payment kind data.' });
          return;
        }
  
        if (paymentKindResult.length === 0) {
          res.status(404).json({ error: 'Payment kind not found.' });
          return;
        }
  
        const payment_kind_id = paymentKindResult[0].id;
  
        // Construct the INSERT query
        const insertQuery = 'INSERT INTO cost_paid (title, amount, note, employee_id, payment_kind_id) VALUES (?, ?, ?, ?, ?)';
        const values = [title, amount, note, employee_id, payment_kind_id];
  
        // Execute the INSERT query
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
            return;
          }
  
          console.log('Data inserted successfully');
          res.status(200).json({ message: 'Data inserted successfully.' });
        });
      });
    });
  });

  router.post('/insertData_cost_to_pay', (req, res) => {
    const { title, amount, note, employee_name, payment_kind_name } = req.body;
  
    // Validate inputs
    if (!title || !amount || !note || !employee_name || !payment_kind_name) {
      res.status(400).json({ error: 'Please fill in all the required fields.' });
      return;
    }
  
    // Retrieve the employee ID based on the employee name
    const selectEmployeeQuery = 'SELECT id FROM employee WHERE name = ?';
    db.query(selectEmployeeQuery, [employee_name], (err, employeeResult) => {
      if (err) {
        console.error('Error retrieving employee data:', err);
        res.status(500).json({ error: 'An error occurred while retrieving employee data.' });
        return;
      }
  
      if (employeeResult.length === 0) {
        res.status(404).json({ error: 'Employee not found.' });
        return;
      }
  
      const employee_id = employeeResult[0].id;
  
      // Retrieve the payment kind ID based on the payment kind name
      const selectPaymentKindQuery = 'SELECT id FROM payment_kind WHERE name = ?';
      db.query(selectPaymentKindQuery, [payment_kind_name], (err, paymentKindResult) => {
        if (err) {
          console.error('Error retrieving payment kind data:', err);
          res.status(500).json({ error: 'An error occurred while retrieving payment kind data.' });
          return;
        }
  
        if (paymentKindResult.length === 0) {
          res.status(404).json({ error: 'Payment kind not found.' });
          return;
        }
  
        const payment_kind_id = paymentKindResult[0].id;
  
        // Construct the INSERT query
        const insertQuery = 'INSERT INTO cost_to_pay (title, amount, note, employee_id, payment_kind_id) VALUES (?, ?, ?, ?, ?)';
        const values = [title, amount, note, employee_id, payment_kind_id];
  
        // Execute the INSERT query
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
            return;
          }
  
          console.log('Data inserted successfully');
          res.status(200).json({ message: 'Data inserted successfully.' });
        });
      });
    });
  });
  
  router.post('/insertData_income_to_take', (req, res) => {
    const { title, amount, note, employee_name, customer_name , service_name} = req.body;
  
    if (!title || !amount || !note || !employee_name || !customer_name || !service_name) {
      res.status(400).json({ error: 'Please fill in all the required fields.' });
      return;
    }
  
    const selectEmployeeQuery = 'SELECT id FROM employee WHERE name = ?';
    db.query(selectEmployeeQuery, [employee_name], (err, employeeResult) => {
      if (err) {
        console.error('Error retrieving employee data:', err);
        res.status(500).json({ error: 'An error occurred while retrieving employee data.' });
        return;
      }
  
      if (employeeResult.length === 0) {
        res.status(404).json({ error: 'Employee not found.' });
        return;
      }

      const employee_id = employeeResult[0].id;
  
      const selectPaymentKindQuery = 'SELECT id FROM customer WHERE name = ?';
      db.query(selectPaymentKindQuery, [customer_name], (err, customerNameResult) => {
        if (err) {
          console.error('Error retrieving payment kind data:', err);
          res.status(500).json({ error: 'An error occurred while retrieving customer data.' });
          return;
        }
  
        if (customerNameResult.length === 0) {
          res.status(404).json({ error: 'customer not found.' });
          return;
        }
  
        const customer_id = customerNameResult[0].id;

        const service = 'SELECT id FROM service WHERE name = ?';
        db.query(service, [service_name], (err, servicetKindResult) => {
          if (err) {
            console.error('Error retrieving payment kind data:', err);
            res.status(500).json({ error: 'An error occurred while retrieving customer data.' });
            return;
          }
    
          if (servicetKindResult.length === 0) {
            res.status(404).json({ error: 'customer not found.' });
            return;
          }
  
          const service_id = servicetKindResult[0].id;
  
        // Construct the INSERT query
        const insertQuery = 'INSERT INTO income_to_take (title, amount, note, employee_id, customer_id , service_id) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [title, amount, note, employee_id, customer_id, service_id];
  
        // Execute the INSERT query
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'An error occurred while inserting the data.' });
            return;
          }
  
          console.log('Data inserted successfully');
          res.status(200).json({ message: 'Data inserted successfully.' });
        });
      });
    });
  });
});

router.post('/insertData_income_taken', (req, res) => {
  const { title, amount, note, employee_name, customer_name , service_name} = req.body;

  if (!title || !amount || !note || !employee_name || !customer_name || !service_name) {
    res.status(400).json({ error: 'Please fill in all the required fields.' });
    return;
  }

  const selectEmployeeQuery = 'SELECT id FROM employee WHERE name = ?';
  db.query(selectEmployeeQuery, [employee_name], (err, employeeResult) => {
    if (err) {
      console.error('Error retrieving employee data:', err);
      res.status(500).json({ error: 'An error occurred while retrieving employee data.' });
      return;
    }

    if (employeeResult.length === 0) {
      res.status(404).json({ error: 'Employee not found.' });
      return;
    }

    const employee_id = employeeResult[0].id;

    const selectPaymentKindQuery = 'SELECT id FROM customer WHERE name = ?';
    db.query(selectPaymentKindQuery, [customer_name], (err, customerNameResult) => {
      if (err) {
        console.error('Error retrieving payment kind data:', err);
        res.status(500).json({ error: 'An error occurred while retrieving customer data.' });
        return;
      }

      if (customerNameResult.length === 0) {
        res.status(404).json({ error: 'customer not found.' });
        return;
      }

      const customer_id = customerNameResult[0].id;

      const service = 'SELECT id FROM service WHERE name = ?';
      db.query(service, [service_name], (err, servicetKindResult) => {
        if (err) {
          console.error('Error retrieving payment kind data:', err);
          res.status(500).json({ error: 'An error occurred while retrieving customer data.' });
          return;
        }
  
        if (servicetKindResult.length === 0) {
          res.status(404).json({ error: 'customer not found.' });
          return;
        }

        const service_id = servicetKindResult[0].id;

      // Construct the INSERT query
      const insertQuery = 'INSERT INTO income_taken (title, amount, note, employee_id, customer_id , service_id) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [title, amount, note, employee_id, customer_id, service_id];

      // Execute the INSERT query
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'An error occurred while inserting the data.' });
          return;
        }

        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully.' });
      });
    });
  });
});
});



  module.exports = router;
