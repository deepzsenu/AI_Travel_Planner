import axios from "axios";
import { config } from "../config/env.js";

export const generateTripPlan = async (tripDetails) => {

  const { source, destination, days, budgetType, interests } = tripDetails;

  const prompt = `
You are an AI travel planner.

Create a travel plan in JSON format.

Trip Details:
Source: ${source}
Destination: ${destination}
Days: ${days}
Budget: ${budgetType}
Interests: ${interests.join(", ")}

Return JSON in this format ONLY:

{
  "itinerary":[
    {
      "day":1,
      "activities":[
        {
          "title":"Place name",
          "description":"short description",
          "time":"Morning"
        }
      ]
    }
  ],
  "estimatedBudget":{
    "flights":0,
    "accommodation":0,
    "food":0,
    "activities":0,
    "total":0
  },
  "hotels":[
    {
      "name":"Hotel name",
      "type":"Budget | Mid-range | Luxury"
    }
  ]
}
`;

  const response = await axios.post(
    `${config.BASEURL}/chat/completions`,
    {
      model: config.MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const content = response.data.choices[0].message.content;

  return content;
};

export const regenerateDayPlan = async ({ destination, day, interests }) => {

  const prompt = `
Generate travel activities for Day ${day} in ${destination}.

Interests: ${interests.join(", ")}

Return JSON:

{
  "day": ${day},
  "activities":[
    {
      "title":"Activity name",
      "description":"short description",
      "time":"Morning"
    }
  ]
}
`;

  const response = await axios.post(
    `${config.BASEURL}/chat/completions`,
    {
      model: config.MODEL,
      messages: [
        { role: "user", content: prompt }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].message.content;
};

export const chatWithTripAI = async ({ trip, message }) => {

  const prompt = `
You are an AI travel assistant.

The user already has this travel itinerary:

${JSON.stringify(trip.itinerary)}

User request:
"${message}"

Modify the itinerary according to the request.

Return JSON ONLY in this format:

{
  "itinerary":[
    {
      "day":1,
      "activities":[
        {
          "title":"Activity name",
          "description":"short description",
          "time":"Morning"
        }
      ]
    }
  ]
}
`;

  const response = await axios.post(
    `${config.BASEURL}/chat/completions`,
    {
      model: config.MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${config.OPENAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].message.content;
};