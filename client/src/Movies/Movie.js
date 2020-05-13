import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = e => {
    e.preventDefault();

    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res =>{
      console.log("delete res: ", res)
      
    })
    .catch(err => console.log("delete err: ", err))
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className = "delete-button" onClick = {deleteMovie}>
        Delete
      </div>
      <Link to = {`/update-movie/${movie.id}`}>Update Movie</Link>

    </div>
  );
}

export default Movie;
