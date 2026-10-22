
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img
          src={movie.poster}
          alt={movie.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x450/222/white?text=No+Poster";
          }}
        />

        <div className="movie-info">
          <h5>{movie.title}</h5>
          <p>{movie.year}</p>
          <span>⭐ {movie.rating}</span>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
    