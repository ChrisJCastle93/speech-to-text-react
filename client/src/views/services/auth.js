
import axios from 'axios';

class ApiService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    signup = (username, email, password) => {
        return axios
            .post(`${this.baseUrl}/api/auth/signup`, { username, email, password }, {
                withCredentials: true
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }
    
    login = (email, password) => {
        return axios
            .post(`${this.baseUrl}/api/auth/login`, { email, password }, {
                withCredentials: true
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }
    
    logout = () => {
        return axios
            .delete(`${this.baseUrl}/api/auth/logout`, { withCredentials: true })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data
            });
    }
    
    // isLoggedIn = () => {
    //     return axios.get(`${this.baseUrl}/api/auth/loggedin`, {
    //         withCredentials: true
    //     }).then(() => {
    //         // ...
    //     })
    // }
}

const apiService = new ApiService()

export default apiService;