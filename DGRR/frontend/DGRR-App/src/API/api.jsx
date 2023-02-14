import axios from 'axios'

export const api = axios.create({
  // 이 부분 수정
  baseURL: 'https://i8b102.p.ssafy.io/',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})
