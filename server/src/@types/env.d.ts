declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_NAME: string;
      NUMBER_OF_ROUNDS: number;
    }
  }
}

export {};
