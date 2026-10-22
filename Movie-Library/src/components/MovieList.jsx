
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

function MovieList() {
  const movies = useSelector((state) => state.movies.movies);

  if (movies.length === 0) {
    return <p className="message">No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
