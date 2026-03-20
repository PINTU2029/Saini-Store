import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await loginUser(formData);
        
        // 1. Token save 
        localStorage.setItem('token', data.token); 
        
        // 2. User ID save 
        localStorage.setItem('userId', data.user._id || data.user.id);

        // 3.  user object save karein (isAdmin )
        localStorage.setItem('user', JSON.stringify(data.user)); 

        alert("✅ Login Successful!");
        navigate('/'); 
        window.location.reload();
    } catch (err) {
        alert("Error: " + (err.response?.data?.msg || "Login failed"));
    }
};

    return (
        <div className="main-container"> {}
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login to Your Account</h2>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    required 
                />
                <button type="submit" className="green-btn">Login Now</button>
            </form>
        </div>
    );
};

export default Login;