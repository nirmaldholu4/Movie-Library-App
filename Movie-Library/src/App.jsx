
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import PrivateRoute from "./components/PrivateRoute";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "./redux/moviesSlice";
import { getPopularMovies, searchMovies } from "./utils/tmdb";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMovies = (query = "") => {
    setLoading(true);
    setError("");

    const request = query.trim()
      ? searchMovies(query.trim())
      : getPopularMovies();

    request
      .then((data) => dispatch(setMovies(data)))
      .catch(() => setError("Unable to load movies."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container page-content">
        <MovieSearch onSearch={loadMovies} />

        {loading && (
          <p className="message">Loading movies...</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && <MovieList />}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/movie/:id"
            element={
              <>
                <Navbar />
                <MovieDetails />
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                <Navbar />
                <Favorites />
              </>
            }
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
