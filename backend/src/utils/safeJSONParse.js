
export const safeJSONParse = (text) => {

  try {

    // remove markdown json block if exists
    text = text.replace(/```json/g, "").replace(/```/g, "");

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}") + 1;

    const jsonString = text.slice(start, end);

    return JSON.parse(jsonString);

  } catch (error) {

    throw new Error("Failed to parse AI response");

  }

};