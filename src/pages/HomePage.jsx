import { useEffect, useState } from "react";
import axios from "axios";

import responseOptions from "../API";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    await axios
      .request({
        ...responseOptions,
        url: "https://api.themoviedb.org/3/trending/movie/day",
      })
      .then((response) => {
        setData(response.data.results);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
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
