import React from "react";
import { useQuery } from "react-query";
import { fetchMovies } from "../api";

export function Movies() {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    "movies",
    () => fetchMovies(),
    {
      retry: 0,
    }
  );

  if (isError) {
    <section id="movies">
      <h2>Latest Movies (Movies API)</h2>
      <p className="error-msg">
        {error || "There was an error fetching the data"}
      </p>
    </section>;
  }

  if (isLoading) {
    <section id="movies">
      <h2>Latest Movies (Movies API)</h2>
      <i className="loader"></i>
    </section>;
  }

  return (
    <section id="movies">
      <h2>Latest Movies (Movies API)</h2>
      {isFetching && <i className="small-loader"></i>}

      <div className="movies-wrapper">
        {data?.map((movie) => {
          return (
            <div className="movie" key={movie._id}>
              <img
                src={`../img/${movie.poster}`}
                alt={`${movie.title} poster`}
              />
              <article>
                <h3>{movie.title}</h3>
                <h4>
                  {movie.releaseYear} / {movie.format}
                </h4>
                <p>{movie.plot}</p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
