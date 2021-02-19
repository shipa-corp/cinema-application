import React, { useState } from "react";
import { useMutation } from "react-query";
import { bookMovie } from "../api";

function validateForm(targetForm) {
  const {
    creditNumber,
    creditMonth,
    creditYear,
    creditCvc,
  } = targetForm.elements;

  if (
    creditNumber.value.trim() === "" ||
    creditMonth.value.trim() === "" ||
    creditYear.value.trim() === "" ||
    creditCvc.value.trim() === ""
  ) {
    return false;
  }

  return true;
}

export function Booking({ movie, onComplete }) {
  const [result, setResult] = useState();

  const [mutateBooking] = useMutation(bookMovie, {
    onError: ({ message }) => setResult(message),
    onSuccess: () => {
      setResult("Booking completed");
      onComplete();
    },
  });

  const handleBook = (e) => {
    e.preventDefault();

    const result = validateForm(e.target);

    if (!result) {
      alert("Please fill up the credit card inputs");

      return false;
    }

    const {
      creditNumber,
      creditMonth,
      creditYear,
      creditCvc,
    } = e.target.elements;

    mutateBooking({
      booking: movie,
      user: {
        name: "UserName",
        lastName: "UserLastName",
        email: "email@test.com",
        creditCard: {
          number: creditNumber.value,
          cvc: creditCvc.value,
          exp_month: creditMonth.value,
          exp_year: creditYear.value,
        },
        membership: "7777888899990000",
      },
    });
  };

  return (
    <section id="booking">
      <h2>Booking API</h2>

      {!movie ? (
        <p>Select a movie to book it</p>
      ) : (
        <div>
          <p>
            A movie has been selected. Please confirm the booking by clicking
            the button below
          </p>

          <article>
            <h3>{movie.movie.title}</h3>
            <hr></hr>
            <p>Room: {movie.cinemaRoom}</p>
            <p>Seat: {movie.seats.join(", ")}</p>
            <p>Cinema: {movie.cinema}</p>
            <p>City: {movie.city}</p>
            <hr></hr>
            <h2>Amount: {movie.totalAmount}</h2>
          </article>

          <form onSubmit={handleBook}>
            <div className="form-group">
              <label htmlFor="creditNumber">Credit card number</label>
              <input type="text" name="creditNumber"></input>
            </div>

            <div className="form-group">
              <label htmlFor="creditMonth">Credit card exp month</label>
              <input type="text" name="creditMonth"></input>
            </div>

            <div className="form-group">
              <label htmlFor="creditYear">Credit card exp year</label>
              <input type="text" name="creditYear"></input>
            </div>

            <div className="form-group">
              <label htmlFor="creditCvc">Credit card CVC</label>
              <input type="text" name="creditCvc"></input>
            </div>

            <button>Book movie</button>
          </form>
        </div>
      )}

      {result && <p>{result}</p>}
    </section>
  );
}
