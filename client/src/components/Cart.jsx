import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  CreditCard,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  const shipping = getCartTotal() >= 5000 ? 0 : 500;
  const total = getCartTotal() + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="ml-auto w-full max-w-md bg-gray-800 border-l border-gray-700 h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 mb-6">Add some puzzles to get started!</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src="/api/placeholder/64/64"
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{item.title}</h4>
                          <p className="text-gray-400 text-sm">{item.pieces} pieces • {item.difficulty}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-blue-400 font-semibold">
                              KES {item.price.toLocaleString()}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-600 rounded transition-colors"
                              >
                                <Minus className="w-3 h-3 text-white" />
                              </button>
                              <span className="text-white text-sm min-w-[1.5rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-600 rounded transition-colors"
                              >
                                <Plus className="w-3 h-3 text-white" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors ml-2"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout Section */}
            {items.length > 0 && (
              <div className="border-t border-gray-700 p-6 space-y-4">
                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>KES {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? 'text-green-400' : ''}>
                      {shipping === 0 ? 'FREE' : `KES ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-green-400 text-xs">
                      🎉 You qualify for free shipping!
                    </p>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-600">
                    <span>Total:</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        Add KES {(5000 - getCartTotal()).toLocaleString()} more for free shipping
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((getCartTotal() / 5000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Checkout
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="w-full py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Clear Cart */}
                {items.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear your cart?')) {
                        clearCart();
                      }
                    }}
                    className="w-full py-2 text-red-400 hover:text-red-300 text-sm transition-colors"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
