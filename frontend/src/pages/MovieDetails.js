import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(() => alert("Erro ao carregar filme"));
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <p>Ano: {movie.year}</p>

      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          style={{ width: "250px", marginBottom: "10px" }}
        />
      )}

      <br />
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default MovieDetails;
