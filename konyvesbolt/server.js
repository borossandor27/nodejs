const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'konyvesbolt2'
})
connection.connect();
app.get('/vasarlo/read/:vasarloid', (req, res) => { });
app.get('/vasarlo/read', (req, res) => {
  connection.query('SELECT * FROM `vasarlo`;', (err, rows, fields) => {
    if (err) throw err
    console.log('The solution is: ', rows[0].nev);
  })
});
app.post('/vasarlo/create', (req, res) => {

})
app.delete('/vasarlo/delete', (req, res) => { });
app.put('/vasarlo/update', (req, res) => { });



app.listen(3000, () => {
  console.log('Lissen 3000 port');
})