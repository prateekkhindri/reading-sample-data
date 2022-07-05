const express = require("express");
// const fs = require("fs");
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("sampleDatabase.db");

const app = express();

const port = 3000;

// Database Logic
const tableName = "sampleData";
const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
  userId INTEGER,
  id INTEGER,
  title TEXT,
  body TEXT
);`;

db.run(sqlQuery);

// Middlewares
app.use(cors());

// Endpoints
app.get("/", (req, res) => {
  console.log("Started request on endpoint / ");
  // const data = fs.readFileSync("./data.json");

  if (req.query.item != "null") {
    console.log("Here", req.query.item);
    db.all(
      `SELECT * from ${tableName} WHERE title='${req.query.item}';`,
      [],
      (err, data) => {
        res.status(200).send(data);
      }
    );
  } else {
    db.all(`SELECT * from ${tableName};`, [], (err, data) => {
      res.status(200).send(data);
    });
  }
});

app.listen(port, () => {
  console.log("Server is running successfully on port ", port);
});

// console.log("Server is running");
