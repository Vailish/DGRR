import axios from 'axios'

const baseaxios = axios.create({
  baseURL: 'https://i8b102.p.ssafy.io/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

export default baseaxios
