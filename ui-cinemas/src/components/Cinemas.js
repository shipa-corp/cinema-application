import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  fetchCinema,
  fetchCinemasByCityId,
  fetchCities,
  fetchCountries,
  fetchStates,
} from "../api";

export function Cinemas({ onMovieSelect }) {
  const [countryId, setCountryId] = useState(undefined);
  const [stateId, setStateId] = useState(undefined);
  const [cityId, setCityId] = useState(undefined);
  const [cinemaId, setCinemaId] = useState(undefined);

  const queryCountries = useQuery("countries", () => fetchCountries(), {
    retry: 0,
  });

  const queryStates = useQuery(
    ["states", countryId],
    () => fetchStates(countryId),
    {
      retry: 0,
      enabled: Boolean(countryId),
    }
  );

  const queryCities = useQuery(
    ["cities", stateId, countryId],
    () => fetchCities(countryId, stateId),
    {
      retry: 0,
      enabled: Boolean(stateId),
    }
  );

  const queryCinemas = useQuery(
    ["cinemas", cityId],
    () => fetchCinemasByCityId(cityId),
    {
      retry: 0,
      enabled: cityId,
    }
  );

  const { data, isLoading, isError } = useQuery(
    ["cinema", cinemaId],
    () => fetchCinema(cinemaId),
    {
      retry: 0,
      enabled: Boolean(cinemaId),
    }
  );

  const schedule = useMemo(() => {
    const today = new Date();
    const newdate = new Date();
    newdate.setDate(today.getDate() + 5);

    return newdate;
  }, []);

  return (
    <section id="catalog">
      <h2>Cinemas (Cinema API)</h2>

      <form>
        <div className="form-group">
          <label htmlFor="countries">Countries</label>
          <select
            name="countries"
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option value="">Select a country</option>
            {queryCountries.data?.map((country) => (
              <option value={country._id}>{country.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="states">States</label>
          <select name="states" onChange={(e) => setStateId(e.target.value)}>
            <option value="">Select a country</option>
            {queryStates.data?.map((state) => (
              <option value={state._id}>{state.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cities">Cities</label>
          <select name="cities" onChange={(e) => setCityId(e.target.value)}>
            <option value="">Select a state</option>
            {queryCities.data?.map((city) => (
              <option value={city._id}>{city.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cinemas">Cinemas</label>
          <select name="cinemas" onChange={(e) => setCinemaId(e.target.value)}>
            <option value="">Select a city</option>
            {queryCinemas.data?.map((cinema) => (
              <option value={cinema._id}>{cinema.name}</option>
            ))}
          </select>
        </div>
      </form>

      <main>
        {isError && (
          <p>There was an error fetching the movies of the selected cinema</p>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="premieres">
            {!data ? (
              <p>No cinema has been selected</p>
            ) : !data.cinemaPremieres ? (
              <p>No premieres at this movie theater</p>
            ) : (
              data?.cinemaPremieres?.map((movie, index) => {
                const handleClick = () =>
                  onMovieSelect({
                    city:
                      queryCities.data.find((city) => city._id === cityId)
                        ?.name || "--",
                    cinema:
                      queryCinemas.data.find((cine) => cine._id === cinemaId)
                        ?.name || "--",
                    movie: {
                      title: movie.title,
                      format: "IMAX",
                    },
                    schedule,
                    cinemaRoom: 7,
                    seats: ["45"],
                    totalAmount: 15,
                  });

                return (
                  <div className="mini-movie" key={index}>
                    <div className="circle">
                      <h3>{movie.title?.charAt(0)}</h3>
                    </div>
                    <article>
                      <h4>{movie.title}</h4>
                      <button onClick={handleClick}>Book</button>
                    </article>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </section>
  );
}
