import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "movieList",
  initialState: {
    movieList: [],
  },
  reducers: {
    fillMovieList(state, action) {
      // return {...state, movieList: action.payload};
      state.movieList = action.payload;
    },
    likeMovie(state, action) {
      state.movieList[action.payload - 1].likes += 1;
    },
    unlikeMovie(state, action) {
      state.movieList[action.payload - 1].likes -= 1;
    },
    dislikeMovie(state, action) {
      state.movieList[action.payload - 1].dislikes += 1;
    },
    undislikeMovie(state, action) {
      state.movieList[action.payload - 1].dislikes -= 1;
    },
    deleteMovie(state, action) {
      return {
        ...state,
        movieList: state.movieList.filter((todo) => todo.id !== action.payload),
      };
    },
  },
});

export const actions = slice.actions;

const store = configureStore({
  reducer: slice.reducer,
});

export default store;
