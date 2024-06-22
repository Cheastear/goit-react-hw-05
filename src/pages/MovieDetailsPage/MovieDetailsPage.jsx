import { useLocation, NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import responseOptions from "../../API";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const prevLocationRef = useRef();

  useEffect(() => {
    prevLocationRef.current = location.state;

    setLoading(true);

    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
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
  }, [movieId, prevLocationRef, location]);

  if (loading) return <p>Loading...</p>;
  else if (data == null && data == undefined) return <></>;

  return (
    <>
      <NavLink to={prevLocationRef.current ?? "/"}>Back</NavLink>
      <div className={css.container}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        />
        <div className={css.info}>
          <h3>{data.title}</h3>
          <p>User score: {data.vote_average}/10</p>
          <p>Overview: </p>
          <p className={css.infoData}>{data.overview}</p>
          <p>Genres: </p>
          <p className={css.infoData}>
            {data.genres.map((elem) => {
              return (
                <span key={elem.id} className={css.genres}>
                  {elem.name}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <ul className={css.addInfo}>
          <li>
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;
