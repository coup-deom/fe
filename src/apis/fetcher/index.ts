import axios, { isAxiosError } from 'axios'

import { UpdateAccessToken } from '@/contexts/AccessToken.context'
import { toast } from '@/contexts/Toast.context'

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
      if (UpdateAccessToken.accessToken.exp - now <= 15 * 60) {
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
          )
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

FETCHER.interceptors.response.use(
  value => {
    if (value.config.method === 'get') {
      return value
    }

    if (value.config.url?.includes('/auth/reissue')) {
      const { accessToken, idToken } = value.data.data
      UpdateAccessToken.update('reissue', { accessToken, idToken })
      return value
    }

    if (value.data.message) {
      toast.add(value.data.message, 'success')
    }

    return value
  },
  (error: any) => {
    if (isAxiosError(error)) {
      if (error?.response?.data?.message) {
        toast.add(error.response.data.message, 'error')
      }
      if (error?.response?.status === 401) {
        localStorage.removeItem('signed_version')
        localStorage.removeItem('raw_access_token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        window.location.href = '/signin'
      }
    }
  },
)
