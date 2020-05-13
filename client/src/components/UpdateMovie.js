import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
  stars: []
};

const UpdateMovie = (props) => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then(res => {
        console.log("update res: ", res)
        setMovie(res.data)
    })
    .catch(err => console.log("update err: ", err))
  }, [props.match.params.id]);

  const changeHandler = (e) => {
    e.persist();

    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        console.log("put res: ", res);
        props.history.push(`/movies`);
      })
      .catch((err) => {
        console.log("put err: ", err);
      });
  };

  return (
    <form onSubmit={submitHandler} className = "updateForm">
      <input
        name="title"
        value={movie.title}
        placeholder="title"
        onChange={changeHandler}
        type="text"
      />
      <input
        name="director"
        value={movie.director}
        placeholder="director"
        onChange={changeHandler}
        type="text"
      />
      <input
        name="metascore"
        value={movie.metascore}
        placeholder="metascore"
        onChange={changeHandler}
        type="number"
      />
      <input
        name="stars"
        value={movie.stars}
        placeholder="stars"
        onChange={changeHandler}
        type="textarea"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateMovie;
