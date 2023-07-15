const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign-in successful, generate token
    const user = results[0];
    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '30d' });

    return res.status(200).json({ message: 'Sign-in successful', token: token });
  });
});

module.exports = router;
