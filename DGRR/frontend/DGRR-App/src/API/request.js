import axios from 'axios'

export const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})

