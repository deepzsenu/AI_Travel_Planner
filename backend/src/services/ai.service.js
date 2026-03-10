import OpenAI from "openai";
import { config } from "../config/env.js";
import { safeJSONParse } from "../utils/aiValidator.js";

const client = new OpenAI({
  apiKey: config.openaiKey,
  baseURL: "https://api.groq.com/openai/v1"
});

export const generateTravelPlan = async (trip) => {

  const prompt = `
You are a professional travel planner.

Create a ${trip.days}-day travel itinerary for ${trip.destination}.

User Interests: ${trip.interests.join(", ")}
Budget Type: ${trip.budgetType}

Return the response strictly in JSON format like this:

{
 "itinerary": [
  {
   "day": 1,
   "activities": [
    {
     "title": "Visit Senso-ji Temple",
     "description": "Explore the famous historic temple",
     "time": "Morning"
    }
   ]
  }
 ],

 "estimatedBudget": {
  "flights": number,
  "accommodation": number,
  "food": number,
  "activities": number,
  "total": number
 },

 "hotels": [
  {
   "name": "Hotel Example",
   "type": "Budget"
  }
 ]
}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
};

export const regenerateTripDay = async (trip, day, instruction) => {

  const prompt = `
You are a professional travel planner.

Current trip destination: ${trip.destination}
Trip duration: ${trip.days} days
User interests: ${trip.interests.join(", ")}

Current itinerary:
${JSON.stringify(trip.itinerary)}

Modify ONLY day ${day}.

Instruction:
${instruction}

Return ONLY JSON in this format:

{
 "day": ${day},
 "activities": [
   {
     "title": "Activity name",
     "description": "Short description",
     "time": "Morning/Afternoon/Evening"
   }
 ]
}
`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

  const content = response.choices[0].message.content;

  const parsed = safeJSONParse(content);

    if (!parsed) {
    throw new Error("Invalid AI JSON response");
    }

    return parsed;

};


export const tripChatAssistant = async (trip, question) => {

  const history = trip.chatHistory.map(msg => ({
    role: msg.role,
    content: msg.message
  }));

  const systemPrompt = `
You are an AI travel assistant.

Destination: ${trip.destination}
Trip duration: ${trip.days} days

Current itinerary:
${JSON.stringify(trip.itinerary)}

Answer user questions about this trip.
Give helpful travel advice.
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: question }
  ];

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.7
  });

  return response.choices[0].message.content;
};