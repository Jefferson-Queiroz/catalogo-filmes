import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ListMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies").then(response => {
      setMovies(response.data);
    });
  }, []);

  function handleDelete(id) {
    if (window.confirm("Deseja excluir este filme?")) {
      api.delete(`/movies/${id}`).then(() => {
        setMovies(movies.filter(movie => movie.id !== id));
      });
    }
  }

  return (
    <div className="container">
      <h1>🎬 Catálogo de Filmes</h1>

      <Link className="btn-add" to="/add">➕ Cadastrar Filme</Link>

      <div className="movies-grid">
        {movies.map(movie => (
          <div className="movie-card" key={movie.id}>
            {movie.image && (
              <img src={movie.image} alt={movie.title} />
            )}

            <div className="movie-card-content">
              <strong>{movie.title}</strong><br />
              <small>{movie.year}</small><br />

              <Link to={`/details/${movie.id}`}>Detalhes</Link><br />
              <Link to={`/edit/${movie.id}`}>Editar</Link><br />

              <button onClick={() => handleDelete(movie.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListMovies;
