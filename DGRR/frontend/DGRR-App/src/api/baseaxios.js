import axios from 'axios'

const baseaxios = axios.create({
  baseURL: 'http://172.30.1.50:8080',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
  // headers: {
  //   'Authorization': 'Bearer ' + token,
  // },
})

export default baseaxios
