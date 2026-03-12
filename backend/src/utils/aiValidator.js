export const validateTripAIResponse = (data) => {

  if (!data) {
    throw new Error("AI returned empty response");
  }

  if (!data.itinerary || !Array.isArray(data.itinerary)) {
    throw new Error("Invalid itinerary format");
  }

  if (!data.estimatedBudget) {
    throw new Error("Missing budget estimation");
  }

  if (!data.hotels || !Array.isArray(data.hotels)) {
    throw new Error("Invalid hotel suggestions");
  }

  data.itinerary.forEach((day) => {

    if (!day.day) {
      throw new Error("Day number missing in itinerary");
    }

    if (!Array.isArray(day.activities)) {
      throw new Error(`Activities missing for Day ${day.day}`);
    }

    day.activities.forEach((activity) => {

      if (!activity.title) {
        throw new Error("Activity title missing");
      }

    });

  });

  return data;
};