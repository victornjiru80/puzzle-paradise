import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';

const Classes = () => {
  const navigate = useNavigate();
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const puzzles = [
    {
      id: 1,
      title: "Mountain Landscape",
      description: "Breathtaking mountain scenery with crystal clear lakes and snow-capped peaks.",
      pieces: 300,
      price: 2450,
      originalPrice: 2950,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Easy",
      inStock: true,
      featured: true
    },
    {
      id: 2,
      title: "Colorful Mandala",
      description: "Intricate mandala design with vibrant colors and mesmerizing patterns.",
      pieces: 500,
      price: 3200,
      originalPrice: 3850,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Medium",
      inStock: true,
      featured: true
    },
    {
      id: 3,
      title: "City Skyline",
      description: "Modern city skyline at night with illuminated skyscrapers and city lights.",
      pieces: 1000,
      price: 4500,
      originalPrice: 5150,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Hard",
      inStock: true,
      featured: true
    },
    {
      id: 4,
      title: "Cute Farm Animals",
      description: "Adorable collection of farm animals perfect for children to learn and enjoy.",
      pieces: 300,
      price: 2050,
      originalPrice: 2550,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Easy",
      inStock: true,
      featured: true
    },
    {
      id: 5,
      title: "Fairy Tale Castle",
      description: "Magical fairy tale castle with enchanting surroundings perfect for young dreamers.",
      pieces: 500,
      price: 2550,
      originalPrice: 3200,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Medium",
      inStock: true
    },
    {
      id: 6,
      title: "Dinosaur World",
      description: "Exciting dinosaur adventure scene perfect for young paleontologists.",
      pieces: 1000,
      price: 3700,
      originalPrice: 4350,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Hard",
      inStock: false
    }
  ];

  const handleAddToCart = (puzzle) => {
    addToCart(puzzle);
  };

  const handlePuzzleClick = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setIsModalOpen(true);
  };

  const handleViewDetails = (puzzleId) => {
    // Navigate to puzzle details - you can implement this later
    console.log('View details for puzzle:', puzzleId);
  };

  return (
    <section id="puzzles" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#3B82F6,_transparent_50%)] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#06B6D4,_transparent_50%)] opacity-10"></div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Jigsaw Puzzles
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our handpicked selection of premium jigsaw puzzles with stunning imagery and exceptional quality.
          </p>
        </motion.div>

        {/* Featured Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {puzzles.filter(puzzle => puzzle.featured).slice(0, 4).map((puzzle, index) => (
            <motion.div
              key={puzzle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                onClick={() => handlePuzzleClick(puzzle)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-700 overflow-hidden">
                  <img
                    src={puzzle.image}
                    alt={puzzle.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {!puzzle.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {puzzle.title}
                    </h3>
                    <span className="text-blue-400 text-xs font-medium bg-blue-500/10 px-2 py-1 rounded">
                      {puzzle.pieces} pcs
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">
                    {puzzle.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-white">
                        KES {puzzle.price.toLocaleString()}
                      </span>
                      {puzzle.originalPrice > puzzle.price && (
                        <span className="text-gray-500 line-through text-xs">
                          KES {puzzle.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-blue-400 text-xs font-medium block">
                        {puzzle.difficulty}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {puzzle.category}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(puzzle);
                      }}
                      disabled={!puzzle.inStock}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                        puzzle.inStock
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {puzzle.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePuzzleClick(puzzle);
                      }}
                      className="px-3 py-2 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Looking for More Puzzles?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse our complete collection of jigsaw puzzles with different categories, piece counts, and difficulty levels.
          </p>
          <button
            onClick={() => navigate('/store')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Puzzles in Stock
          </button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        puzzle={selectedPuzzle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPuzzle(null);
        }}
      />
    </section>
)};

export default Classes;