import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import responseOptions from "../API";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const request = (searchBarText) => {
    let options = {
      ...responseOptions,
      url: `https://api.themoviedb.org/3/search/movie`,
      params: {
        ...responseOptions.params,
        query: searchBarText,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setLoading(true);

        setData(response.data);

        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const searchBar = searchParams.get("searchBar");
    if (searchBar != null) {
      request(searchBar);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.elements.searchBar.value.trim() == "") return;

    setSearchParams({ searchBar: e.target.elements.searchBar.value });
    request(e.target.elements.searchBar.value);
    e.target.reset();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="searchBar" />
        <button name="searchBtn" type="submit">
          Search
        </button>
      </form>
      {data && <MovieList movies={data.results} />}
    </>
  );
};

export default MoviesPage;
