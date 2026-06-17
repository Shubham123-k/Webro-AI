import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.BLUESMINDS_BASE_URL,
  apiKey: process.env.BLUESMINDS_API_KEY,
});

export { openai };
export default openai;
