import { boot } from 'quasar/wrappers'
import axios from 'axios'

const isServer = typeof window === 'undefined'
const LOCAL_API = 'http://localhost:8000'

const DEFAULT_API_URL = process.env.DEV ? `${LOCAL_API}/api` : '/api'
const SERVER = DEFAULT_API_URL

const api = axios.create({ baseURL: SERVER })
api.defaults.headers.get.Accepts = 'application/json'

/* Request Interceptors */
const interceptReqErrors = (err) => Promise.reject(err)
const interceptRequest = (config) => {
  if (typeof window !== 'undefined') {
    const rawToken = localStorage.getItem('token')
    if (rawToken) {
      const token = rawToken.startsWith('"') && rawToken.endsWith('"')
        ? JSON.parse(rawToken)
        : rawToken
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  app.config.globalProperties.$SERV = SERVER
})

const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

const deleteToken = () => {
  delete api.defaults.headers.common.Authorization
}

export { axios, api, setToken, deleteToken, SERVER }
