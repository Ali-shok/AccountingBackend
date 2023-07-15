const express = require('express');
const app = express();
const payments = require("./routers/payments");
const user = require("./routers/users");
const signin = require("./routers/signin");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/',signin);
app.use('/',payments);
app.use('/',user);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});











