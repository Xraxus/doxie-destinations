export const handler = async (event, context) => {
  try {
    const { location } = event.queryStringParameters;

    const { lat, lon } = await getCoordinates(location);

    const weatherUrl = new URL(
      "https://api.openweathermap.org/data/2.5/weather"
    );

    weatherUrl.searchParams.append("lat", lat);
    weatherUrl.searchParams.append("lon", lon);
    weatherUrl.searchParams.append("units", "metric");
    weatherUrl.searchParams.append("appid", process.env.OPENWEATHER_API_KEY);

    const res = await fetch(weatherUrl);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

async function getCoordinates(city) {
  console.log(city);
  try {
    const weatherUrl = new URL("http://api.openweathermap.org/geo/1.0/direct");
    weatherUrl.searchParams.append("q", city);
    weatherUrl.searchParams.append("limit", 1);
    weatherUrl.searchParams.append("appid", process.env.OPENWEATHER_API_KEY);
    const res = await fetch(weatherUrl);
    const data = await res.json();
    const { lat, lon } = data[0];

    return { lat, lon };
  } catch (err) {
    console.error(err.message);
  }
}
