import { useState, createContext } from "react";

import StartingScreen from "./components/StartingScreen";
import TripForm from "./components/TripForm";
import ResultScreen from "./components/ResultScreen";
import Loading from "./components/Loading";

export const TripContext = createContext();

export default function App() {
  const [stage, setStage] = useState(0);
  const [tripData, setTripData] = useState({
    travellers: 1,
    from: "",
    to: "",
    fromDate: "",
    toDate: "",
    budget: "",
  });
  const [result, setResult] = useState({
    formattedFromDate: "",
    formattedToDate: "",
    fromCity: "",
    toCity: "",
    weather: "",
    flight: "",
    hotel: "",
  });

  let stageComponent = <Loading />;
  if (stage === 0) {
    stageComponent = <StartingScreen />;
  } else if (stage === 1) {
    stageComponent = <TripForm />;
  } else if (stage === 2) {
    stageComponent = <ResultScreen />;
  }
  return (
    <TripContext.Provider
      value={{
        stage,
        setStage,
        tripData,
        setTripData,
        result,
        setResult,
      }}
    >
      {stageComponent}
    </TripContext.Provider>
  );
}
