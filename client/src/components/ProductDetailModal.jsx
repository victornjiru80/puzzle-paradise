import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Star, 
  Package, 
  Clock, 
  Award,
  Heart,
  Share2
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ puzzle, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!puzzle) return null;

  const handleAddToCart = () => {
    addToCart({ ...puzzle, quantity });
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  // Mock additional images for demo
  const images = [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600"
  ];

  const features = [
    { icon: Package, text: `${puzzle.pieces} high-quality pieces` },
    { icon: Clock, text: `${puzzle.difficulty} difficulty level` },
    { icon: Award, text: "Premium cardboard construction" },
    { icon: Star, text: "Vibrant, fade-resistant colors" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-800 rounded-xl sm:rounded-2xl border border-gray-700 w-full max-w-sm sm:max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-700/80 hover:bg-gray-600 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-1/2 p-3 sm:p-6">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={images[selectedImage]}
                      alt={puzzle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thumbnail Images */}
                  <div className="flex gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index 
                            ? 'border-blue-500' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${puzzle.title} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 p-3 sm:p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full">
                        {puzzle.category}
                      </span>
                      {!puzzle.inStock && (
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 text-sm font-medium rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{puzzle.title}</h1>
                    <p className="text-gray-400 leading-relaxed">{puzzle.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">(4.0) • 127 reviews</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                      KES {puzzle.price.toLocaleString()}
                    </span>
                    {puzzle.originalPrice > puzzle.price && (
                      <span className="text-lg sm:text-xl text-gray-500 line-through">
                        KES {puzzle.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {puzzle.originalPrice > puzzle.price && (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded">
                        Save KES {(puzzle.originalPrice - puzzle.price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold text-white">Features</h3>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                          <span className="text-sm sm:text-base text-gray-300">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm sm:text-base text-white font-medium">Quantity:</span>
                      <div className="flex items-center bg-gray-700 rounded-lg">
                        <button
                          onClick={decrementQuantity}
                          className="p-2 hover:bg-gray-600 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="px-3 sm:px-4 py-2 text-sm sm:text-base text-white font-medium min-w-[2.5rem] sm:min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="p-2 hover:bg-gray-600 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={!puzzle.inStock}
                        className="flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                        {puzzle.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button className="p-2 sm:p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className="p-2 sm:p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Pieces:</span>
                        <span className="text-white ml-2">{puzzle.pieces}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Difficulty:</span>
                        <span className="text-white ml-2">{puzzle.difficulty}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white ml-2">{puzzle.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className={`ml-2 ${puzzle.inStock ? 'text-green-400' : 'text-red-400'}`}>
                          {puzzle.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">Shipping Information</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Free shipping on orders over KES 5,000</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
