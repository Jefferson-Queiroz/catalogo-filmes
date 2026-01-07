const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new Database("database.db");

// Criação da tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    image TEXT
  )
`).run();

console.log("Tabela movies pronta");

// Rotas
app.get("/", (req, res) => {
  res.send("API de Filmes funcionando!");
});

// LISTAR TODOS
app.get("/movies", (req, res) => {
  const movies = db.prepare("SELECT * FROM movies").all();
  res.json(movies);
});

// BUSCAR POR ID
app.get("/movies/:id", (req, res) => {
  const movie = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: "Filme não encontrado" });
  }

  res.json(movie);
});

// CRIAR
app.post("/movies", (req, res) => {
  const { title, year, image } = req.body;

  const stmt = db.prepare(
    "INSERT INTO movies (title, year, image) VALUES (?, ?, ?)"
  );

  const result = stmt.run(title, year, image);

  res.status(201).json({ id: result.lastInsertRowid });
});

// ATUALIZAR
app.put("/movies/:id", (req, res) => {
  const { title, year, image } = req.body;

  const result = db.prepare(
    "UPDATE movies SET title = ?, year = ?, image = ? WHERE id = ?"
  ).run(title, year, image, req.params.id);

  res.json({ updated: result.changes });
});

// DELETAR
app.delete("/movies/:id", (req, res) => {
  db.prepare("DELETE FROM movies WHERE id = ?").run(req.params.id);
  res.json({ message: "Filme removido com sucesso" });
});

// Porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
