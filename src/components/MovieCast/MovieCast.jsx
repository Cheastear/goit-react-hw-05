import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import responseOptions from "../../API";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);

    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
    <ul className={css.list}>
      {data != null && data.cast != undefined ? (
        data.cast.map((elem) => {
          return (
            <li key={elem.id} className={css.item}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${elem.profile_path}`}
                alt="Photo character"
              />
              <p>{elem.character}</p>
            </li>
          );
        })
      ) : (
        <></>
      )}
    </ul>
  );
};

export default MovieCast;
