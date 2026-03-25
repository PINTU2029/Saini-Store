import React, { useState } from 'react';
import API from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [product, setProduct] = useState({ name: '', price: '', image: '', description: '', category: '' });
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5242880) { 
            alert("Photo badi hai! 5MB se choti photo chunein.");
            e.target.value = null;
            return;
        }
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProduct({ ...product, image: reader.result });
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.image) return alert("Kripya ek photo select karein!");

        try {
           
            const finalProduct = {
                ...product,
                price: Number(product.price)
            };

            await API.post('/products/add', finalProduct); 
            
            alert(" Product Successfully Add ho gaya!");
            navigate('/');
        } catch (err) {
            console.error("Upload Error:", err.response?.data);
            alert(err.response?.data?.msg || err.response?.data?.error || "Error: Admin authorization fail.");
        }
    };

    return (
        <div className="main-container"> 
            <form onSubmit={handleSubmit} className="admin-form">
                <h2>Add New Product</h2>
                <input type="text" placeholder="Product Name" onChange={(e)=>setProduct({...product, name:e.target.value})} required />
                <input type="number" placeholder="Price (₹)" onChange={(e)=>setProduct({...product, price:e.target.value})} required />
                <div style={{textAlign: 'left', marginBottom: '10px'}}>
                    <label style={{fontSize: '12px', color: '#666', marginLeft: '5px'}}>Select Photo:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                {product.image && <img src={product.image} alt="Preview" style={{width: '100px', height: '100px', borderRadius: '10px', marginBottom: '15px', objectFit: 'cover'}} />}
                <input type="text" placeholder="Category" onChange={(e)=>setProduct({...product, category:e.target.value})} required />
                <textarea placeholder="Chota sa description..." onChange={(e)=>setProduct({...product, description:e.target.value})} required></textarea>
                <button type="submit" className="blue-btn">Upload to Website</button>
            </form>
        </div>
    );
};

export default Admin;
