import axios from "axios"
import queryString from "query-string"

const url = "http://localhost:4401/api"
const axiosClient = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

export default axiosClient;