
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../utils/tmdb";
import { toggleFavorite } from "../redux/moviesSlice";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.movies.favorites
  );

  const isFavorite = favorites.some(
    (item) => item.id === Number(id)
  );

  useEffect(() => {
    setMovie(null);
    setError("");
    setLoading(true);

    getMovieDetails(id)
      .then((data) => setMovie(data))
      .catch(() => setError("Unable to load movie details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="message">Loading movie details...</p>;
  }

  if (error || !movie) {
    return <p className="message">{error || "Movie not found."}</p>;
  }

  const handleFavorite = () => {
    if (!localStorage.getItem("loggedInUser")) {
      window.location.href = "/login";
      return;
    }

    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="container details-page">
      <img
        className="details-poster"
        src={movie.poster}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/300x450/222/white?text=No+Poster";
        }}
      />

      <div className="details-info">
        <h1>{movie.title}</h1>

        <p className="rating">⭐ {movie.rating} / 10</p>
        <p><b>Release Year:</b> {movie.year}</p>
        <p><b>Language:</b> {movie.language}</p>
        <p><b>Genre:</b> {movie.genre}</p>
        <p><b>Description:</b> {movie.description}</p>

        <button className="main-button" onClick={handleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        <Link to="/" className="back-home details-back">
          Back to Movies
        </Link>
      </div>
    </div>
  );
}

export default MovieDetails;
