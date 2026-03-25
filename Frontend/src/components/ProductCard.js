import React, { useState } from 'react';
import API from '../services/api'; //  API import 
import myStaticQR from '../assets/my_qr.png'; 

const ProductCard = ({ product, refreshProducts }) => {
    const [showQR, setShowQR] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: product.name, price: product.price });

    
    const userData = localStorage.getItem('user'); 
    const user = userData ? JSON.parse(userData) : null;
    
    const isAdmin = user && user.isAdmin === true; 

    // 1. ORDER NOTIFY FIX
const handleOrderNotify = async () => {
    try {
       
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        await API.post('/order-notify', {
            productName: product.name,
            productPrice: product.price,
            customerName: userData.name || "N/A",
            customerPhone: userData.phone || "N/A",
            customerAddress: userData.address || "N/A"
        });

        alert(" Order Details Admin ko bhej di gayi hain!");
        console.log("Notification Send kiya Gya!");
    } catch (err) {
        console.error("Order notification failed:", err);
        alert("Notification fail ho gayi!");
    }
};

    // 2. DELETE FUNCTION FIX
    const handleDelete = async () => {
        if (window.confirm("Bhai, kya sach mein ye product delete karna hai?")) {
            try {
                
                await API.delete(`/products/${product._id}`);
                alert(" Product delete ho gaya!");
                refreshProducts(); 
            } catch (err) { 
                console.error("Delete Error:", err.response?.data);
                alert("Delete fail! Shayad aap admin nahi hain."); 
            }
        }
    };

    // 3.  UPDATE FUNCTION FIX
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            
            await API.put(`/products/${product._id}`, editData);
            alert(" Product update ho gaya!");
            setIsEditing(false);
            refreshProducts();
        } catch (err) { 
            console.error("Update Error:", err.response?.data);
            alert("Update fail!"); 
        }
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
                
                {}
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
