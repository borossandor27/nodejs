const express = require("express");
const mysql = require("mysql");
const IP = require("ip");
const app = express();

var server = app.listen(8081, () => {
  var host = IP.address();
  var port = server.address().port;
  console.log("A szerver várakozik http://%s:%s", host, port);
});

//-- Kapcsolat teszteléshez -------------------------------
app.get("/", function (req, res) {
  res.send(__dirname + __filename + " program fut");
});

//-- adatbázis kapcsolat létrehozása ----------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//-- Connect to MySQL tesztelés ---------------------------
//db.connect((err) => {
//if (err) throw err;
//else console.log("MySql Connect testing ok!");
//});
//-- adatbázis kapcsolat zárása ---------------------------
//db.end();

//-- Create DB --------------------------------------------
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) throw err;
    });
  }

  db.query(sql, (err) => {
    if (err) throw err;
    else res.send("Database created");
  });
});

//-- Create table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) throw err;
    });
  }
  db.query(sql, (err) => {
    if (err) {
      throw err; //-- "Table 'employee' already exists":1050 ------------
    }
    res.send("Employee table created");
  });

});

// Insert employee 1
app.get("/employee1", (req, res) => {
  let post = { name: "Jake Smith", designation: "Chief Executive Officer" };

  let sql = "INSERT INTO employee SET ?";
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) throw err;
    });
  }
  db.query(sql, post, (err) => {
    if (err) throw err;
    else res.send("Employee 1 added");
  });
});

// Update employee

app.get("/updateemployee/:id", (req, res) => {
  let newName = "Updated name";
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) throw err;
    });
  }
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Post updated...");
  });

});

// Delete employee

app.get("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) throw err;
    });
  }
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee deleted");
  });

});

app.get("/getemployees", (res, req) => {
  let sql = "SELECT * FROM `employee`;";
  if (db.state === "disconnected") {
    db.connect((err) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
    });
  }
  let query = db.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

});
