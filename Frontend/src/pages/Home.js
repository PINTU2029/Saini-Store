import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const getProducts = async () => {
        try {
            const { data } = await fetchProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Products load karne mein error:", err);
            setLoading(false);
        }
    };

  
    useEffect(() => {
        getProducts();
    }, []);

    if (loading) {
        return <div className="main-container"><h3>Loading Products...</h3></div>;
    }

    return (
        <div className="main-container">
            <h1>Our Products</h1>
            
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
                        <p style={{ color: '#888', fontSize: '18px' }}>Abhi koi product nahi hai.</p>
                        <p style={{ color: '#0071e3' }}>Admin panel se naya product add karein!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;