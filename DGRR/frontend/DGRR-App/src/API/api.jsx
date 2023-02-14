import axios from 'axios'

export const api = axios.create({
  // 이 부분 수정
  baseURL: 'http://3.38.97.157:8080/api/',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})
