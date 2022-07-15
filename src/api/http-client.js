import axios from "axios";

const client = axios.create({
    baseURL: location.origin + "/api",
    timeout: 5 * 1000,
    withCredentials: true
})

export default client