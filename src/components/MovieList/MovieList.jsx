import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const backLinkHref = useLocation();
  return (
    <ul>
      {movies.map((elem) => {
        return (
          <li key={elem.id}>
            <NavLink to={`/movies/${elem.id}`} state={backLinkHref}>
              {elem.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
};

export default MovieList;
