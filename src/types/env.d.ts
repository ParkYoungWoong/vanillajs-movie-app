declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OMDB_API_KEY: string
      OPENAI_API_KEY: string
    }
  }
}
export {}
