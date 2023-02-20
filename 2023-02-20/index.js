var express = require("express");
var mysql = require("mysql");
var app = express();

//-- kapcsolat beállítása ---
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL kapcsolat aktív!");
});

app.listen(8081, () => {
  console.log("A szerver fut");
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE dolgozok;";
  db.query(sql, (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("Dolgozó adatbázis létrehozva.");
  });
  res.send("Dolgozó adatbázis létrehozva.");
});

app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE dolgozo(id int AUTO_INCREMENT, nev VARCHAR(255) NOT NULL, beosztas VARCHAR(255), PRIMARY KEY(id));";
  db.query(sql, (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log("Dolgozó tábla létrehozva.");
  });
  res.send("Dolgozó tábla létrehozva.");
});

app.get("/insertdolgozo", (req, res) => {
  let sql = "INSERT INTO dolgozo SET ?";
  let uj = { nev: "Tóth Lajos", beosztas: "manager" };
  let query = db.query(sql, uj, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("dolgozó hozzáadva");
    }
  });
  res.send("dolgozó hozzáadva");
});

app.get("/update/:id", (req, res) => {
  let ujbeosztas = "kis főnök";
  let sql =
  `UPDATE dolgozo SET beosztas='${ujbeosztas}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      res.send(err.message);
      throw err;
    } else {
      res.send("Módosítva");
    }
  });
});

app.get("/delete/:id", (req, res) => {
    let sql =
    `DELETE FROM dolgozo  WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err) => {
      if (err) {
        res.send(err.message);
        throw err;
      } else {
        res.send("Törölve");
      }
    });
  });
