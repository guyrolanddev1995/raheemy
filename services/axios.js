import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({ baseURL: 'https://preview-api.raheemy.com/api' })
// const axiosInstance = axios.create({ baseURL: 'http://192.168.0.184:8002/api' })

axiosInstance.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token')
    if(token) config.headers['Authorization'] = `Bearer ${token}`
    return config
}, (error) => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                await AsyncStorage.removeItem('token')
                await AsyncStorage.removeItem('user')
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance