import axios from 'axios';

const API = axios.create({ 
    baseURL: 'https://saini-store.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

//  YE HAI ASLI FIX: Har request se pehle token apne aap lag jayega
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// 1. Register User
export const registerUser = async (userData) => {
    return API.post('/users/register', userData);
};

// 2. Login User
export const loginUser = (userData) => API.post('/users/login', userData);

// 3. Fetch All Products
export const fetchProducts = () => API.get('/products');

// 4. Order Notification
export const sendOrderNotification = (orderData) => {
    return API.post('/order-notify', orderData);
};

export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

export default API;
