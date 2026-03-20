import React, { useState } from 'react';
import axios from 'axios';
import myStaticQR from '../assets/my_qr.png'; 

const ProductCard = ({ product, refreshProducts }) => {
    const [showQR, setShowQR] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: product.name, price: product.price });

    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user'); 
    const user = userData ? JSON.parse(userData) : null;
    
    
    const isAdmin = user && user.isAdmin === true; 

    const handleOrderNotify = async () => {
        if (!token) {
            alert("Order karne ke liye please pehle Login karein!");
            return;
        }

        try {
            // FIXED: Port 5000 
            await axios.post('http://localhost:5000/api/order-notify', {
                productName: product.name,
                productPrice: product.price
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Admin notified via email!");
        } catch (err) {
            console.error("Order notification failed:", err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Bhai, kya sach mein ye product delete karna hai?")) {
            try {
                
                await axios.delete(`http://localhost:5000/api/products/${product._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                refreshProducts(); 
            } catch (err) { alert("Delete fail! Shayad aap admin nahi hain."); }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${product._id}`, editData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsEditing(false);
            refreshProducts();
        } catch (err) { alert("Update fail!"); }
    };

    
    if (isEditing) {
        return (
            <div className="card">
                <div className="card-info">
                    <h3>Edit Product</h3>
                    <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{width: '100%', marginBottom: '10px'}} />
                    <input type="number" value={editData.price} onChange={(e) => setEditData({...editData, price: e.target.value})} style={{width: '100%', marginBottom: '10px'}} />
                    <button onClick={handleUpdate} className="green-btn" style={{marginRight: '10px'}}>Update</button>
                    <button onClick={() => setIsEditing(false)} className="logout-btn">Cancel</button>
                </div>
            </div>
        );
    }

    
    return (
        <div className="card">
            <img src={product.image} alt={product.name} />
            <div className="card-info">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                
                {/* Pay Now or Close Button (Visible to All) */}
                <button 
                    onClick={() => {
                        if(!showQR) handleOrderNotify(); 
                        setShowQR(!showQR);
                    }} 
                    className="green-btn"
                >
                    {showQR ? 'Close' : 'Pay Now'}
                </button>

                {/* --- QR Code and Admin Buttons Window (Hidden initially) --- */}
                {showQR && (
                    <div className="qr-container" style={{ textAlign: 'center' }}>
                        
                        {/* 1. QR Code Box (Visible to All inside the window) */}
                        <div style={{background: 'white', padding: '10px', borderRadius: '10px', marginTop: '15px', display: 'inline-block'}}>
                            <img src={myStaticQR} alt="QR Code" className="qr-image" style={{width: '150px', height: '150px'}} />
                        </div>
                        <p className="upi-text" style={{marginTop:'10px', fontSize: '14px', fontWeight: 'bold'}}>Scan & Pay ₹{product.price}</p>
                        
                        {/* User Notification Text */}
                        <p style={{fontSize: '10px', color: '#666', marginTop: '5px'}}>
                            Scan karte hi aapka address admin ko bhej diya jayega.
                        </p>

                        {/* --- FIXED: Admin Buttons are back inside this window, only for Admins --- */}
                        {isAdmin && (
                            <div className="admin-controls" style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <button onClick={() => setIsEditing(true)} className="edit-mini-btn" style={{ background: '#ffc107', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                                <button onClick={handleDelete} className="delete-mini-btn" style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;