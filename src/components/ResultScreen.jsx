import { useContext } from "react";
import { TripContext } from "../App";

export default function ResultScreen() {
  const { result, setStage, setResult } = useContext(TripContext);

  function handleRestart() {
    setStage(0);
    setResult({
      formattedFromDate: "",
      formattedToDate: "",
      fromCity: "",
      toCity: "",
      weather: "",
      flight: "",
      hotel: "",
    });
  }

  return (
    <div className="result-screen">
      <h2>Your Trip</h2>
      <div className="dates">
        <p>
          <span className="arrow-icon">→ </span>
          {result.formattedFromDate}
        </p>
        <p>
          {result.formattedToDate}
          <span className="arrow-icon"> ←</span>
        </p>
      </div>
      <p className="destination">
        {result.fromCity}
        <span className="arrow-icon"> → </span>
        {result.toCity}
      </p>
      <h3>Weather</h3>
      <p>{result.weather}</p>
      <h3>Flights</h3>
      <p>
        {result.flight}
        <button className="dblock" disabled>
          Book flight
        </button>
      </p>

      <h3>Hotel</h3>
      <p>
        {result.hotel}
        <button className="dblock" disabled>
          Book hotel
        </button>
      </p>

      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}
