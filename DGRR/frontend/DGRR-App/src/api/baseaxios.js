import axios from 'axios'

const baseaxios = axios.create({
  // baseURL: 'https://i8b102.p.ssafy.io/',
  baseURL: 'http://192.168.31.142:8080/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  // headers: {
  //   'Authorization': 'Bearer ' + token,
  // },
})

export default baseaxios
