const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

const backendUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_BACKEND_URL

const frontendUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_URL_BASE_LOCAL
    : import.meta.env.VITE_URL_BASE

export { clientId, openaiApiKey, backendUrl, frontendUrl }
