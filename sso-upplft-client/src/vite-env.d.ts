/// <reference types="vite/client" />

interface ImportMetaEnv {
    // App
    readonly VITE_API_BASE_URL: string;
  
    // Auth0
    readonly VITE_AUTH0_DOMAIN: string;
    readonly VITE_AUTH0_CLIENT_ID: string;
    readonly VITE_AUTH0_AUDIENCE: string;
  
    // Sentry
    readonly VITE_SENTRY_AUTH_TOKEN: string;
  
    // Posthog
    readonly VITE_POSTHOG_KEY: string;
    readonly VITE_POSTHOG_HOST: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  