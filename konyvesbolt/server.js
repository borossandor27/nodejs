const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'konyvesbolt2'
})
connection.connect();
app.post('/create', (req,res) => {

})


connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})


app.listen(3000, () => {
    console.log('Connect 3000 port');
})