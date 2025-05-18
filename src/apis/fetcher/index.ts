import axios, { isAxiosError } from 'axios'

import { UpdateAccessToken } from '@/contexts/AccessToken.context'

export const FETCHER = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 10000,
  withCredentials: true,
})

let refreshPromise: Promise<any> | null = null

FETCHER.interceptors.request.use(
  async config => {
    if (!config.url?.includes('/auth/reissue')) {
      const now = Date.now() / 1000
      if (UpdateAccessToken.accessToken.exp - now <= 5 * 60) {
        if (refreshPromise) {
          await refreshPromise
        } else {
          console.info('Reissuing access token')
          refreshPromise = FETCHER.post(
            '/auth/reissue',
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${UpdateAccessToken.accessToken}`,
              },
            },
          ).then(res => res.data as { accessToken: string; idToken: string })

          const { accessToken, idToken } = await refreshPromise
          UpdateAccessToken.update('reissue', { accessToken, idToken })
          refreshPromise = null
        }
      }
    }

    config['headers']['Authorization'] =
      `Bearer ${UpdateAccessToken.rawAccessToken}`

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

FETCHER.interceptors.response.use(undefined, (error: any) => {
  if (isAxiosError(error)) {
    if (error?.response?.status === 401) {
      localStorage.removeItem('signed_version')
      localStorage.removeItem('raw_access_token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('id_token')
      window.location.href = '/signin'
    }
  }
})
