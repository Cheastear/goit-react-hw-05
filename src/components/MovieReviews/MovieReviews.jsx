import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import responseOptions from "../../API";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    };

    axios
      .request(options)
      .then((response) => {
        setLoading(true);

        setData(response.data);

        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {data.results.map((elem) => {
        return (
          <li key={elem.id} className={css.item}>
            <p>Author: {elem.author}</p>
            <p>{elem.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
