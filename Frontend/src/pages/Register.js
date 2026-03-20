import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '',
        phone: '',
        address: ''
    });

    const navigate = useNavigate();

    // ERROR FIX: Ye function sahi se data map karega
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // 'name' attribute se value map hogi
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Browser console (F12) mein check karein ki data hai ya nahi
        console.log("Form se nikalne wala data:", formData);

        try {
            await registerUser(formData);
            alert("Registration Successful! Please Login.");
            navigate('/login'); 
        } catch (err) {
            console.error("Backend ne error di:", err.response?.data);
            alert("Error: " + (err.response?.data?.msg || "Registration failed"));
        }
    };

    return (
        <div className="main-container"> 
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Create Account</h2>
                
                <input 
                    type="text" 
                    name="name" // Backend model se match hona chahiye
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleChange} 
                    required 
                />

                <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleChange} 
                    required 
                />

                <input 
                    type="tel" 
                    name="phone" // ZAROORI: 'phone' hi likhein
                    placeholder="10-Digit Phone Number" 
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange} 
                    required 
                />

                <textarea 
                    name="address" // ZAROORI: 'address' hi likhein
                    placeholder="Full Delivery Address" 
                    rows="3"
                    style={{ width: '100%', padding: '15px', borderRadius: '14px', marginBottom: '20px' }}
                    value={formData.address}
                    onChange={handleChange} 
                    required 
                ></textarea>

                <input 
                    type="password" 
                    name="password"
                    placeholder="Create Password" 
                    minLength="6"
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                />

                <button type="submit" className="green-btn">Register Now</button>
            </form>
        </div>
    );
};

export default Register;