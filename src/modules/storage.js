import { setToken, deleteToken } from 'boot/axios'

// Fungsi untuk memastikan kode berjalan di browser
const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

export const setHeaderToken = token => setToken(token)

export const setLocalToken = token => {
  if (isBrowser()) {
    localStorage.setItem('token', JSON.stringify(token))
  }
}

export const getLocalToken = () => {
  if (isBrowser()) {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      return token.startsWith('"') && token.endsWith('"')
        ? JSON.parse(token)
        : token
    } catch (e) {
      return token
    }
  }
  return null
}

export const setUser = user => {
  if (isBrowser()) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const getUser = () => {
  if (isBrowser()) {
    return JSON.parse(localStorage.getItem('user') || 'null')
  }
  return null
}

export const deleteHeaderToken = () => deleteToken()

export const deleteLocalToken = () => {
  if (isBrowser()) {
    localStorage.removeItem('token')
  }
}

export const isBlocked = () => {
  if (isBrowser()) {
    return localStorage.getItem('blocked') === 'true'
  }
  return false
}

export const setBlocked = value => {
  if (isBrowser()) {
    localStorage.setItem('blocked', JSON.stringify(value))
  }
}

export const deleteUser = () => {
  if (isBrowser()) {
    localStorage.removeItem('user')
  }
}
