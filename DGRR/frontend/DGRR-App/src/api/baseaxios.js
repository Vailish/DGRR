import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.31.142",
  // headers: {
  //   'Authorization': 'Bearer ' + token,
  // },
});

export default instance;