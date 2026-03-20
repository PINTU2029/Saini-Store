import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [product, setProduct] = useState({ name: '', price: '', image: '', description: '', category: '' });
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // 1MB check
        if (file && file.size > 1048576) { 
            alert("Photo badi hai! 1MB se choti photo chunein.");
            e.target.value = null;
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProduct({ ...product, image: reader.result });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.image) return alert("Kripya ek photo select karein!");

       
        const token = localStorage.getItem('token'); 
        if (!token) {
            alert("Pehle Login karein! Aap admin nahi hain.");
            return navigate('/login');
        }

        try {
            
            await axios.post('http://localhost:5000/api/products/add', product, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            
            alert("✅ Product Successfully Add ho gaya!");
            navigate('/');
        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data?.msg || "Error: Admin check fail ho gaya ya server band hai.");
        }
    };

    return (
        <div className="main-container"> 
            <form onSubmit={handleSubmit} className="admin-form">
                <h2>Add New Product</h2>
                
                <input type="text" placeholder="Product Name" 
                    onChange={(e)=>setProduct({...product, name:e.target.value})} required />
                
                <input type="number" placeholder="Price (₹)" 
                    onChange={(e)=>setProduct({...product, price:e.target.value})} required />
                
                <div style={{textAlign: 'left', marginBottom: '10px'}}>
                    <label style={{fontSize: '12px', color: '#666', marginLeft: '5px'}}>Select Photo:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>

                {product.image && (
                    <img src={product.image} alt="Preview" 
                        style={{width: '100px', height: '100px', borderRadius: '10px', marginBottom: '15px', objectFit: 'cover'}} 
                    />
                )}

                <input type="text" placeholder="Category" 
                    onChange={(e)=>setProduct({...product, category:e.target.value})} required />
                
                <textarea placeholder="Chota sa description..." 
                    onChange={(e)=>setProduct({...product, description:e.target.value})} required></textarea>
                
                <button type="submit" className="blue-btn">Upload to Website</button>
            </form>
        </div>
    );
};

export default Admin;