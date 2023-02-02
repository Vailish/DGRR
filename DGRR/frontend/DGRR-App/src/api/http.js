import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://192.168.31.134:80/login',
})
