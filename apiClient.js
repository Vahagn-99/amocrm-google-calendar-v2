import axios from 'axios';

window.baseUrl = 'https://google-calendar-api.dicitech.com/api/';
window.url = 'https://google-calendar-api.dicitech.com/';


const apiClient = axios.create({
    baseURL: window.baseUrl,
    headers: {
        'X-token': localStorage.getItem('access_token'),
    }
});

apiClient.interceptors.request.use(async (config) => {
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
