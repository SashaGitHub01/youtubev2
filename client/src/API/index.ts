import axios from 'axios'

export const rootApi = axios.create({
   baseURL: process.env.SERVER,
   withCredentials: true,
})