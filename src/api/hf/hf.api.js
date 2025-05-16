import { instance } from '../base.api'

const model = 'hf'

const hfAPI = {
  evaluateApplicants: (data, token) => {
    ;`
        {
            "description": "Se busca desarrollador backend con experiencia en Node.js y bases de datos SQL.",
            "requirements": "Node.js, PostgreSQL, Express, APIs REST.",
            "applicants": [
                { "id": "1", "cv": "Desarrollador backend con experiencia en Node.js y Express, he trabajado con PostgreSQL y APIs REST." },
                { "id": "2", "cv": "Ingeniero con experiencia en Java y Spring Boot." },
                { "id": "3", "cv": "Full stack con experiencia en Node.js, PostgreSQL y desarrollo de APIs REST." }
            ]
        }
        `
    return instance.post(`/${model}/evaluate-applicants`, data, {
      headers: {
        'x-token': token,
      },
    })
  },
}

export default hfAPI
