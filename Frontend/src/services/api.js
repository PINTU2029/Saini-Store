import axios from 'axios';


const API = axios.create({ 
    baseURL: 'https://saini-store.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
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
export const sendOrderNotification = (orderData, token) => {
    return API.post('/order-notify', orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default API;