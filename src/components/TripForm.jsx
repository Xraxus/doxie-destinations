import React, { useContext } from "react";
import { TripContext } from "../App";

export default function TripForm() {
  const { tripData, setTripData, setStage, setResult } =
    useContext(TripContext);

  function handleChange(e) {
    setTripData((prevTripData) => {
      return {
        ...prevTripData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStage(-1);
    const response = await fetch(`/.netlify/functions/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tripData,
      }),
    });
    const data = await response.json();
    setResult(data);
    setStage(2);
  }

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <label htmlFor="travellers">Number of travellers</label>
      <div id="travellers-input">
        <button
          type="button"
          onClick={() => {
            if (tripData.travellers > 1) {
              setTripData((prevTripData) => {
                return {
                  ...prevTripData,
                  travellers: prevTripData.travellers - 1,
                };
              });
            }
          }}
        >
          -
        </button>
        <input
          type="number"
          id="travellers"
          name="travellers"
          placeholder="2"
          value={tripData.travellers}
          onChange={(e) => handleChange(e)}
        />
        <button
          type="button"
          onClick={() =>
            setTripData((prevTripData) => {
              return { ...prevTripData, travellers: tripData.travellers + 1 };
            })
          }
        >
          +
        </button>
      </div>
      <fieldset>
        <label htmlFor="from">Flying from</label>
        <input
          type="text"
          id="from"
          name="from"
          placeholder="New York"
          value={tripData.from}
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="to">Flying to</label>
        <input
          type="text"
          id="to"
          name="to"
          placeholder="Paris"
          value={tripData.to}
          onChange={(e) => handleChange(e)}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="fromDate">From date</label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          value={tripData.fromDate}
          onChange={(e) => handleChange(e)}
          required
        />
        <label htmlFor="toDate">To date</label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          value={tripData.toDate}
          onChange={(e) => handleChange(e)}
          required
        />
      </fieldset>
      <label htmlFor="budget">Budget</label>
      <input
        type="text"
        id="budget"
        name="budget"
        placeholder="1000"
        value={tripData.budget}
        onChange={(e) => handleChange(e)}
        required
      />
      <button type="submit">Plan my Trip!</button>
    </form>
  );
}
