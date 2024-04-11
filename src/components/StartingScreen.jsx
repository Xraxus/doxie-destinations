import Logo from "../assets/logo.png";
import { useContext } from "react";
import { TripContext } from "../App";

export default function () {
  const { setStage } = useContext(TripContext);

  return (
    <div className="starting-screen">
      <h1>Doxie Destinations</h1>
      <img
        src={Logo}
        alt="Dachshund wearing a pilot hat with a suitcase in front of it"
      ></img>
      <button onClick={() => setStage(1)}>Let's Begin</button>
    </div>
  );
}
