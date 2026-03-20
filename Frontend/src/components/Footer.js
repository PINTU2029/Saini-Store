import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Saini-<span>Store</span></h3>
                    <p>Aapke bharosemand business ka digital sathi. Hum behtareen quality aur fast service mein vishwas rakhte hain.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>📧 pintusaini13072003@gmail.com</p>
                    <p>📍 Dausa, India</p>
                    <p>📞 +91 9509785106</p>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 Saini-Store | All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;