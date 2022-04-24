import React, { useState, useEffect } from "react";
import "./MovieCard.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { actions } from "../store/index";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";

export default function MovieCard(props) {
  const [movie, setMovie] = useState(props.movie);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const movieList = useSelector((state) => state.movieList);

  const likeHandler = () => {
    if (!liked) {
      props.dispatch(actions.likeMovie(movie.id));
      setMovie({ ...movie, likes: movie.likes + 1 });
      if (disliked) {
        props.dispatch(actions.undislikeMovie(movie.id));
        setMovie({ ...movie, dislikes: movie.dislikes - 1 });
      }
    } else {
      props.dispatch(actions.unlikeMovie(movie.id));
      setMovie({ ...movie, likes: movie.likes - 1 });
    }
    setLiked(!liked);
    setDisliked(false);
  };

  const dislikeHandler = () => {
    if (!disliked) {
      props.dispatch(actions.dislikeMovie(movie.id));
      setMovie({ ...movie, dislikes: movie.dislikes + 1 });
      if (liked) {
        props.dispatch(actions.unlikeMovie(movie.id));
        setMovie({ ...movie, likes: movie.likes - 1 });
      }
    } else {
      props.dispatch(actions.undislikeMovie(movie.id));
      setMovie({ ...movie, dislikes: movie.dislikes - 1 });
    }
    setDisliked(!disliked);
    setLiked(false);
  };

  const deleteHandler = () => {
    props.dispatch(actions.deleteMovie(movie.id));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>{movie.title}</h2>
        <h5>{movie.category}</h5>
        <div
          style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}
        >
          <div style={{ marginRight: "1rem", color: "black" }}>
            {
              <IconButton
                disabled={disliked}
                onClick={() => likeHandler()}
                size="small"
                color="inherit"
              >
                {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                {movie.likes}{" "}
              </IconButton>
            }
          </div>
          {
            <IconButton
              disabled={liked}
              onClick={() => dislikeHandler()}
              size="small"
              color="inherit"
            >
              {disliked ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
              {movie.dislikes}
            </IconButton>
          }
          <div>
            <span className="card-delete" onClick={() => deleteHandler()}>
              &times;
            </span>
          </div>
        </div>
        <ProgressBar
          style={{ height: "5px" }}
          now={
            (Number(movie.likes) /
              (Number(movie.likes) + Number(movie.dislikes))) *
            100
          }
        />
      </div>
    </div>
  );
}
