import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Store from "./pages/Store";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { AppProvider } from "./context/appContext";

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    setIsAdminAuthenticated(authStatus === 'true');
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AppProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home />
                </>
              } />
              <Route path="/store" element={
                <>
                  <Navbar />
                  <Store />
                </>
              } />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/login" 
                element={<AdminLogin onLogin={handleAdminLogin} />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard onLogout={handleAdminLogout} />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AppProvider>
  );
}

export default App;