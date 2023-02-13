import axios from 'axios'

const request = axios.create({
  baseURL: 'http://192.168.31.142:8080',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    accept: 'application/json,',
  },
})

//요청 타임아웃 설정
request.defaults.timeout = 2500

//요청 인터셉터 추가
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    //요청 에러가 발생했을 때 수행할 로직
    console.log(error) //디버깅
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

export default request
