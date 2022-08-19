import axios from "axios";
import { router } from "../router/router"

const client = axios.create({
  baseURL: location.origin + "/api",
  timeout: 5 * 1000,
  withCredentials: true
})

client.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    console.log(error.response.status);
    router.push("/login")
  }
  return Promise.reject(error);
})

export default client