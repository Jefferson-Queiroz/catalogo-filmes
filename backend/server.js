const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Filmes funcionando!");
});

app.get("/movies", async (req, res) => {
  const result = await pool.query("SELECT * FROM movies");
  res.json(result.rows);
});

app.get("/movies/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM movies WHERE id = $1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

app.post("/movies", async (req, res) => {
  const { title, year, image, description, genre } = req.body;

  await pool.query(
    `INSERT INTO movies (title, year, image, description, genre)
     VALUES ($1, $2, $3, $4, $5)`,
    [title, year, image, description, genre]
  );

  res.status(201).send();
});

app.put("/movies/:id", async (req, res) => {
  const { title, year, image, description, genre } = req.body;

  await pool.query(
    `UPDATE movies
     SET title=$1, year=$2, image=$3, description=$4, genre=$5
     WHERE id=$6`,
    [title, year, image, description, genre, req.params.id]
  );

  res.send();
});

app.delete("/movies/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM movies WHERE id=$1",
    [req.params.id]
  );
  res.send();
});

app.listen(3001, () => {
  console.log("Servidor rodando");
});
