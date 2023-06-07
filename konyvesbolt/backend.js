const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'konyvesbolt2'
})
connection.connect();

// Vásárlók beolvasása
app.get('/readAll', (req, res) => {
  let sql = "SELECT `vasarloid`,`nev`,`email_cim`,`felhasznalonev` FROM `vasarlo`;";
  connection.query(sql, (err, rows) => {
    if (err) {
      console.log("Vásárlók beolvasása sikertelen");
      throw err;
    }
    else {
      res.status(200).json(rows);
    }
  });

});

// Vásárló hozzáadása
app.post('/create', (req, res) => {
  const nev = req.body.nev;
  const email = req.body.email;
  const felhasznalonev = req.body.felhasznalonev;
  const password = req.body.pass1;

  const sql = `INSERT INTO vasarlo (vasarloid, nev, email_cim, felhasznalonev, jelszo) VALUES (NULL, '${nev}', '${email}', '${felhasznalonev}', '${password}')`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('Vásárló hozzáadása sikeres!');
    res.status(200).json(rows);
  });

});

// Vásárló kiválasztása
app.get('/read/:id', (req, res) => {
  let id = req.params.id;
  let sql = `SELECT vasarloid, nev, email_cim, felhasznalonev FROM vasarlo WHERE vasarloid = ${id};`;
  connection.query(sql, (err, row) => {
    if (err) throw err;
    res.status(200).json(row);
    //console.log(row);
  });
});


// Vásárló törlése
app.delete('/delete/:id', (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM vasarlo WHERE vasarloid = ${id};`;
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('Sikeres törlés!');
    res.json('Sikeres törlés!');
  });
});

// Vásárló módosítása
app.put('/update/:id', (req, res) => {

});

let port = 3000;
// Szerver futása
app.listen(port, function () {
  console.log(`Portszám: ${port}`);
});

