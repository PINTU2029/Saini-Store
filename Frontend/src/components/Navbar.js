import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Logged Out Successfully!");
        navigate('/login');
        window.location.reload(); 
    };

    
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${searchQuery}`); 
        } else {
            navigate('/'); 
        }
    };

    return (
        <nav className="navbar navbar-expand-lg"> {/* Bootstrap Class */}
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                Saini-<span>Store</span>
            </div>

            {}
            <form className="d-flex mx-auto search-form" onSubmit={handleSearch}>
                <input 
                    className="form-control me-2" 
                    type="search" 
                    placeholder="Search name or category..." 
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ borderRadius: '20px', paddingLeft: '15px',height: '100%', paddingTop: '0',paddingBottom: '0', lineHeight: '38px', display: 'flex', alignItems: 'center' }}
                />
                <button className="btn btn-primary search-btn" type="submit">
                    Search
                </button>
            </form>
            {}
            
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                
                {token ? (
                    <>
                        <Link to="/admin" className="admin-btn">+ Add Product</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
