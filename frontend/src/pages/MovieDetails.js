import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <p><strong>Ano:</strong> {movie.year}</p>
      <p><strong>Gênero:</strong> {movie.genre}</p>
      <p>{movie.description}</p>

      {movie.image && <img src={movie.image} alt={movie.title} width="250" />}

      <br /><br />
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default MovieDetails;
