
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",

  initialState: {
    movies: [],
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]")
  },

  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },

    toggleFavorite: (state, action) => {
      const movie = action.payload;

      const exists = state.favorites.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== movie.id
        );
      } else {
        state.favorites.push(movie);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    }
  }
});

export const { setMovies, toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;
