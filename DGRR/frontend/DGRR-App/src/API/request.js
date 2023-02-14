import axios from 'axios'

export const request = axios.create({
  // baseURL: "http://3.38.97.157:8080",
  baseURL: "http://192.168.31.142:8080",
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})

