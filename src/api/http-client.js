import axios from "axios";
import { router } from "../router/router"

const client = axios.create({
  baseURL: location.origin + "/api",
  timeout: 5 * 1000,
  withCredentials: true
})

client.interceptors.response.use((response) => {
  return response.data
}, async (error) => {
  if (error.response.status === 401) {
    console.log(error.response.status);
    await router.push("/login")
  }

  throw error
})

export default client