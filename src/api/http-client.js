import axios from "axios";

const client = axios.create({
  baseURL: location.origin + "/api",
  timeout: 5 * 1000,
  withCredentials: true
})

client.interceptors.response.use((response) => {
  return response.data
}, (error) => { })

export default client