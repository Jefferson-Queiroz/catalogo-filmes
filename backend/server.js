const express = require("express");
const cors = require("cors");
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = path.join(__dirname, "database.sqlite");
let db;

// Inicializar banco
initSqlJs().then(SQL => {
  if (fs.existsSync(dbFile)) {
    const filebuffer = fs.readFileSync(dbFile);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        year INTEGER NOT NULL,
        image TEXT
      );
    `);
    saveDb();
  }

  console.log("Banco SQLite inicializado com sql.js");
});

function saveDb() {
  const data = db.export();
  fs.writeFileSync(dbFile, Buffer.from(data));
}

// Rota teste
app.get("/", (req, res) => {
  res.send("API de Filmes funcionando!");
});

// LISTAR
app.get("/movies", (req, res) => {
  const result = db.exec("SELECT * FROM movies");
  const movies = result[0]
    ? result[0].values.map(row => ({
        id: row[0],
        title: row[1],
        year: row[2],
        image: row[3]
      }))
    : [];
  res.json(movies);
});

// BUSCAR POR ID
app.get("/movies/:id", (req, res) => {
  const result = db.exec(
    `SELECT * FROM movies WHERE id = ${req.params.id}`
  );

  if (!result[0]) {
    return res.status(404).json({ error: "Filme não encontrado" });
  }

  const row = result[0].values[0];
  res.json({
    id: row[0],
    title: row[1],
    year: row[2],
    image: row[3]
  });
});

// CRIAR
app.post("/movies", (req, res) => {
  const { title, year, image } = req.body;

  db.run(
    `INSERT INTO movies (title, year, image)
     VALUES (?, ?, ?)`,
    [title, year, image]
  );

  saveDb();
  res.status(201).json({ message: "Filme criado com sucesso" });
});

// ATUALIZAR
app.put("/movies/:id", (req, res) => {
  const { title, year, image } = req.body;

  db.run(
    `UPDATE movies SET title = ?, year = ?, image = ?
     WHERE id = ?`,
    [title, year, image, req.params.id]
  );

  saveDb();
  res.json({ message: "Filme atualizado" });
});

// DELETAR
app.delete("/movies/:id", (req, res) => {
  db.run(`DELETE FROM movies WHERE id = ?`, [req.params.id]);
  saveDb();
  res.json({ message: "Filme removido" });
});

// Porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
