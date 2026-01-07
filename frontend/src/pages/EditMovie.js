import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    api.get(`/movies/${id}`).then(res => {
      setTitle(res.data.title);
      setYear(res.data.year);
      setImage(res.data.image || "");
      setDescription(res.data.description || "");
      setGenre(res.data.genre || "");
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    api.put(`/movies/${id}`, {
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
      <h1>Editar Filme</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
        <input value={image} onChange={e => setImage(e.target.value)} />
        <input value={genre} onChange={e => setGenre(e.target.value)} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default EditMovie;
