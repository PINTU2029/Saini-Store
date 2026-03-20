import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Logged Out Successfully!");
        navigate('/login');
        window.location.reload(); // Navbar ke buttons update karne ke liye
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                Saini-<span>Store</span>
            </div>
            
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                
                {token ? (
                    <>
                        {/* Admin logged in: Blue Add Product & Red Logout */}
                        <Link to="/admin" className="admin-btn">+ Add Product</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        {/* Guest: Simple Links */}
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;