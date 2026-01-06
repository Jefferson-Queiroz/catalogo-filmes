import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/movies", {
      title,
      year,
      image
    }).then(() => {
      navigate("/");
    }).catch(() => {
      alert("Erro ao cadastrar filme");
    });
  }

  return (
    <div className="container">
      <h1>Cadastrar Filme</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={e => setYear(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="URL da capa do filme"
          value={image}
          onChange={e => setImage(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AddMovie;
