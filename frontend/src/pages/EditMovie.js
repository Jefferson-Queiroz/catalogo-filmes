import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    api.get(`/movies/${id}`).then(response => {
      setTitle(response.data.title);
      setYear(response.data.year);
      setImage(response.data.image || "");
    });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    api.put(`/movies/${id}`, {
      title,
      year,
      image
    }).then(() => {
      navigate("/");
    }).catch(() => {
      alert("Erro ao atualizar filme");
    });
  }

  return (
    <div className="container">
      <h1>Editar Filme</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
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

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default EditMovie;
