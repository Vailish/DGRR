import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://i8b102.p.ssafy.io/',

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})
