import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/movies", {
      title,
      year,
      image,
      description,
      genre
    }).then(() => {
      navigate("/");
    });
  }

  return (
    <div className="container">
      <h1>Cadastrar Filme</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="number" placeholder="Ano" value={year} onChange={e => setYear(e.target.value)} required />
        <input placeholder="URL da capa" value={image} onChange={e => setImage(e.target.value)} />
        <input placeholder="Gênero" value={genre} onChange={e => setGenre(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AddMovie;
