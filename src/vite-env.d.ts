/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_KAKAO_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_ID: string

  readonly VITE_API_HOST: string
  readonly VITE_OAUTH_CALLBACK: string
  readonly VITE_HOST: string

  readonly VITE_DEV_USER: string
  readonly VITE_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
