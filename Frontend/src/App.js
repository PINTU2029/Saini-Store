import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components Import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Import
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

function App() {
  // Check user login status for Admin route
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {}
        <Navbar />

        {}
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Route for Admin */}
            <Route 
              path="/admin" 
              element={token ? <Admin /> : <Login />} 
            />
          </Routes>
        </main>

        {}
        <Footer />

      </div>
    </Router>
  );
}

export default App;