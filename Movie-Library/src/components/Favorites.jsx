
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { toggleFavorite } from "../redux/moviesSlice";

function Favorites() {
  const favorites = useSelector(
    (state) => state.movies.favorites
  );

  const dispatch = useDispatch();

  return (
    <div className="container page-content">
      <h2 className="section-title">My Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p className="message">
          No favorite movies yet. Open a movie and add it to favorites.
        </p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />

              <button
                className="favorite-remove"
                onClick={() => dispatch(toggleFavorite(movie))}
              >
                Remove Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
