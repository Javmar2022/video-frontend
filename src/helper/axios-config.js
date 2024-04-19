import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:4000'
// baseURL: 'https://videos-backend5.onrender.com'
baseURL: 'https://video-backend-pbvy.onrender.com'
    
});

export {
    axiosInstance,
}