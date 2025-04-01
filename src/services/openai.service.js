import OpenAI from "openai";
import { openaiApiKey } from "../config/index.config";

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

export const getChatResponse = async (msg) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: msg }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return "Hubo un error al obtener la respuesta";
  }
};
