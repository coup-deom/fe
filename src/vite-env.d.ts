/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOST: string
  readonly VITE_OAUTH_CALLBACK: string
  readonly VITE_HOST: string

  readonly VITE_DEV_USER: string
  readonly VITE_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
