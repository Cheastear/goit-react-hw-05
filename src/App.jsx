import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navigation from "./components/Navigation/Navigation";

const HomePage = lazy(() => import("./Pages/HomePage"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./Pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <>
      <Navigation />

      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
