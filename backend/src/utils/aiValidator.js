export const safeJSONParse = (content) => {

  try {

    return JSON.parse(content);

  } catch (error) {

    console.error("AI returned invalid JSON");

    return null;

  }

};