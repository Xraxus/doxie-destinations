export async function getCurrentWeather({ location }) {
  try {
    const response = await fetch(
      `/.netlify/functions/getCurrentWeather?location=${location}`
    );
    const data = response.json();
    return JSON.stringify(data);
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
