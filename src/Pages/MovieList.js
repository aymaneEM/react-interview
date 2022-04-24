import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import MovieCard from "../Components/MovieCard";
import "./MovieList.css";

export default function MovieList() {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);

  const [selectedCategory, setSelectedCategory] = useState("Show All");

  // dynamic list array of existing categories
  let categories = useMemo(() => loadCategories(movieList), [movieList]);

  // number of movies per load
  const [load, setLoad] = useState(4);

  // counter for load more clicks
  const [loadMore, setLoadMore] = useState(1);

  //array that contains movies that belong to chosen category
  const [filteredMovieList, setFilteredMovieList] = useState([]);

  const filterMovies = (cat) => {
    if (cat === "Show All") {
      setFilteredMovieList(movieList);
    } else {
      setFilteredMovieList(movieList.filter((movie) => movie.category === cat));
    }
  };

  useEffect(() => {
    if (selectedCategory === "Show All") {
      setFilteredMovieList(movieList.slice(0, load * loadMore));
    } else {
      setFilteredMovieList(
        movieList
          .filter((movie) => movie.category === selectedCategory)
          .slice(0, load * loadMore)
      );
    }
  }, [loadMore, movieList]);

  // when 'number of movies to load' changes
  useEffect(() => {
    if (Number(load) !== 0) {
      setLoadMore(1);
      if (selectedCategory === "Show All") {
        setFilteredMovieList(movieList.slice(0, load * loadMore));
      } else {
        setFilteredMovieList(
          movieList
            .filter((movie) => movie.category === selectedCategory)
            .slice(0, load * loadMore)
        );
      }
    }
  }, [load]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Form>
        <Form.Select
          style={{
            width: "20%",
            minWidth: "200px",
            margin: "10px 15px",
          }}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setLoadMore(1);
            filterMovies(e.target.value);
          }}
          value={selectedCategory}
        >
          <option> Show All </option>{" "}
          {categories.map((category, id) => (
            <option key={id}> {category} </option>
          ))}{" "}
        </Form.Select>{" "}
        <Form.Control
          type="number"
          style={{
            width: "20%",
            minWidth: "200px",
            margin: "10px 15px",
          }}
          placeholder="Per Load"
          value={load}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
        />{" "}
      </Form>{" "}
      <div className="parent">
        {" "}
        {filteredMovieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} dispatch={dispatch} />
        ))}{" "}
      </div>{" "}
      <Button
        variant="secondary"
        size="sm"
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
        onClick={() => {
          setLoadMore(loadMore + 1);
        }}
      >
        Load More{" "}
      </Button>{" "}
    </div>
  );
}

//fill set with unique categories and then convert to array
const loadCategories = (movieList) => {
  let catSet = new Set();
  for (let i = 0; i < movieList.length; i++) {
    catSet.add(movieList[i].category);
  }
  return Array.from(catSet);
};
