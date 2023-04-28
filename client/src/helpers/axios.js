import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';

const token = window.localStorage.getItem('token');

const axiosInstant = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ``
    }
});

axiosInstant.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if(auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

export default axiosInstant;