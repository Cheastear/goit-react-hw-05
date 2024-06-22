import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import responseOptions from "../../API";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
    <ul className={css.list}>
      {data.cast.map((elem) => {
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
      })}
    </ul>
  );
};

export default MovieCast;
