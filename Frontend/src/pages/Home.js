import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 👈 URL track karne ke liye
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // 🔍 Isse humein URL ki query milti hai

    const getProducts = async () => {
        try {
            setLoading(true);
            // 1. URL se search query nikalna (e.g., ?search=phone)
            const searchParams = new URLSearchParams(location.search);
            const searchQuery = searchParams.get('search') || "";

            // 2. API ko search query ke saath call karna
            const { data } = await fetchProducts(searchQuery); 
            
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Products load karne mein error:", err);
            setLoading(false);
        }
    };

    // ✅ Jab bhi location.search (URL ka query part) badlega, getProducts chalega
    useEffect(() => {
        getProducts();
    }, [location.search]); 

    if (loading) {
        return <div className="main-container"><h3>Loading Products...</h3></div>;
    }

    return (
        <div className="main-container">
            {/* 🔍 Search result ke hisaab se heading badalna */}
            <h1>{new URLSearchParams(location.search).get('search') ? "Search Results" : "Our Products"}</h1>
            
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            refreshProducts={getProducts} 
                        />
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '50px' }}>
                        <p style={{ color: '#888', fontSize: '18px' }}>Koi product nahi mila.</p>
                        <p style={{ color: '#0071e3' }}>Kuch naya search karke dekhein!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
