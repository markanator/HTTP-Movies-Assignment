import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList,getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${params.id}`);
  };

  const deleteMovie = () => {
    // history.push(`/update-movie/${params.id}`);

    console.log("User wants to delete movie!")

    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res)=>{
      // console.log(res)
      getMovieList();
      history.push('/');
    })
    .catch((err)=>console.error(err));
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

      <div className="edit-button" onClick={editMovie}>
      Edit Movie
      </div>
      
      <div className="delete-button" onClick={deleteMovie}>
      Delete Movie
      </div>


    </div>
  );
}

export default Movie;
