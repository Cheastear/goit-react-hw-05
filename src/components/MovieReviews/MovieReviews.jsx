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
  return (
    <ul>
      {data != null && data.results != undefined ? (
        data.results.map((elem) => {
          return (
            <li key={elem.id} className={css.item}>
              <p>Author: {elem.author}</p>
              <p>{elem.content}</p>
            </li>
          );
        })
      ) : (
        <></>
      )}
    </ul>
  );
};

export default MovieReviews;
