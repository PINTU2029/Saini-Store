import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://saini-store.onrender.com/api'
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);
export const fetchProducts = (search = "") => API.get(`/products?search=${search}`);
export const sendOrderNotification = (orderData) => API.post('/order-notify', orderData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

export default API;
