//api.jsx
import axios from 'axios'

const api = axios.create({
  // 이 부분 수정
  baseURL: 'http://192.168.31.142:8080/api/',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})

export const apis = {
  random: () =>
    api
      .get('/random')
      .then(res => res.data.message)
      .catch('!!!'), //지금은 단순한 get요청
  // 보낼 위치로 수정
  sendresult: async data => {
    const response = await api.post('/v1/game', JSON.stringify(data))
    return response
  },
  getPlayers: async data => {
    const response = await api.get('/v1/matching/1', JSON.stringify(data))
    console.log(response)
    return response
  },
}
