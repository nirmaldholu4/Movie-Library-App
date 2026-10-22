
const API_URL = "http://localhost:3000/movies";

export const IMAGE_URL = "";

export const getPopularMovies = () => {
  return fetch(API_URL).then((res) => {
    if (!res.ok) throw new Error("Movies load failed");
    return res.json();
  });
};

export const searchMovies = (query) => {
  return fetch(`${API_URL}?q=${encodeURIComponent(query)}`).then((res) => {
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  });
};

export const getMovieDetails = (id) => {
  return fetch(`${API_URL}/${id}`).then((res) => {
    if (!res.ok) throw new Error("Movie details load failed");
    return res.json();
  });
};
