import axios from 'axios';
import { authStore } from '~/stores/auth';

export const useAxios = () => {
    const auth = authStore();
    const config = useRuntimeConfig();
    const apiUrl = config.public.API_URL;

    const provider = axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    provider.interceptors.request.use((config: any) => {
        const authParams = {
            Authorization: `Bearer ${auth.user.bearerToken}`
        }
        if (auth.user.bearerToken) {
            config.headers = { ...config.headers, ...authParams }
        }
        return config
    })
    
    provider.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            return Promise.reject(error)
        },
    )
    return provider;
}