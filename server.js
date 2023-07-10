const express = require('express');
const app = express();
const db = require('./db');
const payments = require("./routers/payments");
const user = require("./routers/users");



app.use('/',payments);
app.use('/',user);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});












