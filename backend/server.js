const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
  } else {
    console.log("Banco conectado");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    image TEXT,
    description TEXT,
    genre TEXT
  )
`);

app.get("/", (req, res) => {
  res.send("API de Filmes funcionando!");
});

app.get("/movies", (req, res) => {
  db.all("SELECT * FROM movies", (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM movies WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!row) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.json(row);
  });
});

app.post("/movies", (req, res) => {
  const { title, year, image, description, genre } = req.body;

  db.run(
    `INSERT INTO movies (title, year, image, description, genre)
     VALUES (?, ?, ?, ?, ?)`,
    [title, year, image, description, genre],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { title, year, image, description, genre } = req.body;

  db.run(
    `UPDATE movies
     SET title = ?, year = ?, image = ?, description = ?, genre = ?
     WHERE id = ?`,
    [title, year, image, description, genre, id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Filme atualizado" });
    }
  );
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM movies WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ message: "Filme removido" });
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
