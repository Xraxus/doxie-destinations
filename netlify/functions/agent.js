import OpenAI from "openai";

/** OpenAI config */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function handler(event, context) {
  console.log(event.body);
  const tripData = JSON.parse(event.body);

  const messages = [
    {
      role: "system",
      content: `
      You are an AI travel agent assisting a traveler in planning their trip.
      The AI travel agent should return a JSON object containing details of the trip, including weather information only for the destination city ("to" city).

      The agent should provide specific details based on the given tripData object, excluding weather information for the origin city ("from" city).
      Make up flight and hotel data. For the weather, incorporate current conditions and predict weather during the trip. Utilize the provided tools to gather weather information rather than offering generic responses.

Here's an example response format:
{
    "formattedFromDate": "22nd Nov 24",
    "formattedToDate": "30th Nov 24",
    "fromCity": "New York",
    "toCity": "Paris",
    "weather": "Expect unsettled weather with a low of 13°C and a high of 14°C",
    "weather": "Expect mild weather with a low of 19°C and a high of 25°C", 
    "flight": "The best option for you is with Delta Airlines with a layover in Oslo", "hotel": "We recommend you stay at the Premiere Inn hotel in central Paris"
}
RETURN JSON ONLY
`,
    },
    { role: "user", content: JSON.stringify(tripData) },
  ];

  const runner = openai.beta.chat.completions.runTools({
    model: "gpt-3.5-turbo",
    messages,
    tools,
  });

  const finalContent = await runner.finalContent();

  return {
    statusCode: 200,
    body: JSON.stringify(finalContent),
  };
}

// AGENT TOOLS
export async function getCurrentWeather({ location }) {
  try {
    const response = await fetch(
      `/.netlify/functions/getCurrentWeather?location=${location}`
    );
    const data = await response.json();
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
