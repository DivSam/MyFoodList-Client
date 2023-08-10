export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
      REACT_APP_SERVER: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
      NEXT_PUBLIC_SECRET: string;
    }
  }
}