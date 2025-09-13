import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Puzzle, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount } = useCart();

  // Navigation array
  const navigation = [
    { name: "Home", href: "/", type: "scrollTop" },
    { name: "Puzzles", href: "/store", type: "route" },
    { name: "Features", href: "features", type: "scroll" },
    { name: "Contact Us", href: "contact", type: "scroll" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item.type === "scrollTop") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (item.type === "scroll") {
      if (location.pathname !== "/") {
        // Navigate to home first, then scroll to section
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      } else {
        // Already on home page, just scroll
        setTimeout(() => {
          const element = document.getElementById(item.href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (item.type === "route") {
      navigate(item.href);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/70 backdrop-blur-lg py-2" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 group">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Puzzle className="h-6 w-6 text-white" />
                </div>
                <span className="font-extrabold text-xl tracking-wider text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-cyan-500 after:transition-all after:duration-300 group-hover:after:w-full">
                  PUZZLE•PARADISE
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 font-semibold text-[17px]">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-300 hover:text-white relative inline-block transition-colors duration-300
                  before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 
                  before:bg-gradient-to-r before:from-blue-400 before:to-cyan-500 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {item.name}
                </button>
              ))}
              
              {/* User Icon */}
              <button
                onClick={() => navigate('/admin/login')}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <User className="h-6 w-6" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button and cart */}
            <div className="md:hidden flex items-center gap-4">
              {/* Mobile User Icon */}
              <button
                onClick={() => navigate('/admin/login')}
                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <User className="h-6 w-6" />
              </button>

              {/* Mobile Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/90 backdrop-blur-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-300 w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
      
      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;