import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import responseOptions from "../../API";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);

    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    };

    axios
      .request(options)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  else if (data == null) return <></>;
  else if (data.results.length == 0) return <p>No reviews</p>;

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
