const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const backendUrl = "http://localhost:3000/api/v1";

const frontendUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_URL_BASE_LOCAL
    : import.meta.env.VITE_URL_BASE;

export { clientId, openaiApiKey, backendUrl, frontendUrl };
