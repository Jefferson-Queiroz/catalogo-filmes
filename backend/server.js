const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco
const db = new sqlite3.Database("./database.db");

// Criar tabela de filmes
db.run(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    year INTEGER,
    image TEXT
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err.message);
  } else {
    console.log("Tabela movies criada com sucesso");
  }
});


//rota post
app.post("/movies", (req, res) => {
  const { title, year, image } = req.body;

  db.run(
    "INSERT INTO movies (title, year, image) VALUES (?, ?, ?)",
    [title, year, image],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});


//rota GET
app.get("/movies", (req, res) => {
  const sql = "SELECT * FROM movies";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

//  rota movies
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM movies WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(row);
  });
});

// rota put
app.put("/movies/:id", (req, res) => {
  const { title, year, image } = req.body;

  db.run(
    "UPDATE movies SET title = ?, year = ?, image = ? WHERE id = ?",
    [title, year, image, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ updated: this.changes });
    }
  );
});

// rota delete
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM movies WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json({ message: "Filme deletado com sucesso!" });
  });
});


// Rota de teste
app.get("/", (req, res) => {
  res.send("TESTE DEFINITIVO - BACKEND CORRETO");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
