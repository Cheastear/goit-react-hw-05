import { useEffect, useState } from "react";
import axios from "axios";

import responseOptions from "../API";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .request({
        ...responseOptions,
        url: "https://api.themoviedb.org/3/trending/movie/day",
      })
      .then((response) => {
        setLoading(true);

        setData(response.data.results);

        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Tranding today</h2>
      {loading && <p>Loading...</p>}
      {!loading && <MovieList movies={data} />}
    </>
  );
};

export default HomePage;
