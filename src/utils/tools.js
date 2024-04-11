export async function getCurrentWeather({ location }) {
  try {
    const { lat, lon } = await getCoordinates(location);
    const weatherUrl = new URL(
      "https://api.openweathermap.org/data/2.5/weather"
    );

    weatherUrl.searchParams.append("lat", lat);
    weatherUrl.searchParams.append("lon", lon);
    weatherUrl.searchParams.append("units", "metric");
    weatherUrl.searchParams.append(
      "appid",
      import.meta.env.VITE_OPENWEATHER_API_KEY
    );
    const res = await fetch(weatherUrl);
    const data = await res.json();
    return JSON.stringify(data);
  } catch (err) {
    console.error(err.message);
  }
}

async function getCoordinates(city) {
  console.log(city);
  try {
    const weatherUrl = new URL("http://api.openweathermap.org/geo/1.0/direct");
    weatherUrl.searchParams.append("q", city);
    weatherUrl.searchParams.append("limit", 1);
    weatherUrl.searchParams.append(
      "appid",
      import.meta.env.VITE_OPENWEATHER_API_KEY
    );
    const res = await fetch(weatherUrl);
    const data = await res.json();
    const { lat, lon } = data[0];
    console.log(data, lat, lon);
    return { lat, lon };
  } catch (err) {
    console.error(err.message);
  }
}

export const tools = [
  {
    type: "function",
    function: {
      function: getCurrentWeather,
      parse: JSON.parse,
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The name of the city from where to get the weather",
          },
        },
        required: ["location"],
      },
    },
  },
];
