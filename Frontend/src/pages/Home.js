import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const getProducts = useCallback(async () => {
        try {
            setLoading(true);
            const searchParams = new URLSearchParams(location.search);
            const searchQuery = searchParams.get('search') || "";
            const { data } = await fetchProducts(searchQuery);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Error loading products:", err);
            setLoading(false);
        }
    }, [location.search]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    if (loading) {
        return <div className="main-container"><h3>Loading...</h3></div>;
    }

    return (
        <div className="main-container">
            <h1>{new URLSearchParams(location.search).get('search') ? "Search Results" : "Our Products"}</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((p) => (
                        <ProductCard key={p._id} product={p} refreshProducts={getProducts} />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '50px' }}>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
