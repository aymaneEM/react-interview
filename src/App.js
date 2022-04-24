import { useEffect, useState } from "react";
import { movies$ } from "./assets/movies";
import Nav from "./layout/Nav";
import MovieList from "./Pages/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store/index";
import Button from "react-bootstrap/Button";
import ReplayIcon from "@mui/icons-material/Replay";

function App() {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    movies$.then((res) => {
      dispatch(actions.fillMovieList(res));
    });
  }, [reload]);

  return (
    <>
      <Nav />
      <Button
        variant="info"
        size="sm"
        style={{ position: "fixed", bottom: 50, right: 10 }}
        onClick={() => setReload(!reload)}
      >
        <ReplayIcon />
        Reload Movies
      </Button>
      <MovieList list={movieList} />
    </>
  );
}

export default App;
