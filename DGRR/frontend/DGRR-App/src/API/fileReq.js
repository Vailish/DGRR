import axios from 'axios'

const fileReq = axios.create({
  // baseURL: 'https://i8b102.p.ssafy.io/',
  baseURL: 'http://192.168.31.142:8080',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8; multipart/form-data ',
  },
  // headers: {
  //   'Authorization': 'Bearer ' + token,
  // },
})

export default fileReq
