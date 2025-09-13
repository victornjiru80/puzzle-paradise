import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star, Package, Eye, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductDetailModal from '../components/ProductDetailModal';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPieceCategory, setSelectedPieceCategory] = useState('All Pieces');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const categories = ['All', 'Adult Puzzles', 'Kids Puzzles'];
  const pieceCategories = ['All Pieces', '300 pieces', '500 pieces', '1000 pieces'];

  const puzzles = [
    // Adult Puzzles - 300 pieces
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
      title: "Ocean Sunset",
      description: "Stunning ocean sunset with golden reflections and peaceful waves.",
      pieces: 300,
      price: 2300,
      originalPrice: 2800,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Easy",
      inStock: true,
      featured: false
    },
    // Adult Puzzles - 500 pieces
    {
      id: 3,
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
      id: 4,
      title: "Abstract Art",
      description: "Modern abstract artwork with bold colors and geometric shapes.",
      pieces: 500,
      price: 3100,
      originalPrice: 3750,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Medium",
      inStock: true,
      featured: false
    },
    {
      id: 5,
      title: "Vintage World Map",
      description: "Beautifully detailed vintage-style world map perfect for geography enthusiasts.",
      pieces: 500,
      price: 3450,
      originalPrice: 4100,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Medium",
      inStock: false,
      featured: false
    },
    // Adult Puzzles - 1000 pieces
    {
      id: 6,
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
      id: 7,
      title: "Forest Wildlife",
      description: "Beautiful forest scene with various wildlife in their natural habitat.",
      pieces: 1000,
      price: 4250,
      originalPrice: 4900,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Hard",
      inStock: true,
      featured: false
    },
    {
      id: 8,
      title: "Space Galaxy",
      description: "Stunning galaxy view with nebulae, stars, and cosmic phenomena.",
      pieces: 1000,
      price: 4750,
      originalPrice: 5550,
      image: "/api/placeholder/400/300",
      category: "Adult Puzzles",
      difficulty: "Hard",
      inStock: true,
      featured: false
    },
    // Kids Puzzles - 300 pieces
    {
      id: 9,
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
      id: 10,
      title: "Cartoon Safari",
      description: "Fun cartoon safari animals in bright colors that kids will love.",
      pieces: 300,
      price: 1950,
      originalPrice: 2450,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Easy",
      inStock: true,
      featured: false
    },
    // Kids Puzzles - 500 pieces
    {
      id: 11,
      title: "Fairy Tale Castle",
      description: "Magical fairy tale castle with enchanting surroundings perfect for young dreamers.",
      pieces: 500,
      price: 2550,
      originalPrice: 3200,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Medium",
      inStock: true,
      featured: false
    },
    {
      id: 12,
      title: "Underwater Adventure",
      description: "Colorful underwater scene with friendly sea creatures and coral reefs.",
      pieces: 500,
      price: 2800,
      originalPrice: 3450,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Medium",
      inStock: true,
      featured: false
    },
    // Kids Puzzles - 1000 pieces
    {
      id: 13,
      title: "Dinosaur World",
      description: "Exciting dinosaur adventure scene perfect for young paleontologists.",
      pieces: 1000,
      price: 3700,
      originalPrice: 4350,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Hard",
      inStock: true,
      featured: false
    },
    {
      id: 14,
      title: "Space Adventure",
      description: "Fun space exploration theme with rockets, planets, and friendly aliens.",
      pieces: 1000,
      price: 3850,
      originalPrice: 4500,
      image: "/api/placeholder/400/300",
      category: "Kids Puzzles",
      difficulty: "Hard",
      inStock: false,
      featured: false
    }
  ];

  const filteredPuzzles = puzzles.filter(puzzle => {
    const matchesCategory = selectedCategory === 'All' || puzzle.category === selectedCategory;
    const matchesPieces = selectedPieceCategory === 'All Pieces' || 
                         `${puzzle.pieces} pieces` === selectedPieceCategory;
    const matchesSearch = puzzle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         puzzle.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPieces && matchesSearch;
  });

  const sortedPuzzles = [...filteredPuzzles].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'pieces-low':
        return a.pieces - b.pieces;
      case 'pieces-high':
        return b.pieces - a.pieces;
      case 'featured':
      default:
        return b.featured - a.featured;
    }
  });

  const handleAddToCart = (puzzle) => {
    addToCart(puzzle);
  };

  const handlePuzzleClick = (puzzle) => {
    setSelectedPuzzle(puzzle);
    setIsModalOpen(true);
  };

  const handleViewDetails = (puzzleId) => {
    console.log('View details for puzzle:', puzzleId);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#3B82F6,_transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#06B6D4,_transparent_50%)] opacity-10"></div>
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Puzzle{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Store
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our complete collection of premium jigsaw puzzles with various themes, piece counts, and difficulty levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search puzzles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-col gap-4">
              {/* Main Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Piece Count Filter */}
              <div className="flex flex-wrap gap-2">
                {pieceCategories.map(pieceCategory => (
                  <button
                    key={pieceCategory}
                    onClick={() => setSelectedPieceCategory(pieceCategory)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                      selectedPieceCategory === pieceCategory
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {pieceCategory}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="pieces-low">Pieces: Low to High</option>
                <option value="pieces-high">Pieces: High to Low</option>
              </select>

              <div className="flex border border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-400">
              Showing {sortedPuzzles.length} of {puzzles.length} puzzles
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedPieceCategory !== 'All Pieces' && ` with ${selectedPieceCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedPuzzles.map((puzzle, index) => (
              <motion.div
                key={puzzle.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
              >
                <div 
                  className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                    viewMode === 'list' ? 'flex-1 flex' : ''
                  }`}
                  onClick={() => handlePuzzleClick(puzzle)}
                >
                  {/* Image */}
                  <div className={`relative bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden ${
                    viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
                  }`}>
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
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePuzzleClick(puzzle);
                        }}
                        className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {puzzle.title}
                      </h3>
                      <span className="text-blue-400 text-sm font-medium bg-blue-500/10 px-2 py-1 rounded">
                        {puzzle.pieces} pcs
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {puzzle.description}
                    </p>


                    {/* Price and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">
                          KES {puzzle.price.toLocaleString()}
                        </span>
                        {puzzle.originalPrice > puzzle.price && (
                          <span className="text-gray-500 line-through text-sm">
                            KES {puzzle.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-blue-400 text-sm font-medium block">
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
                        onClick={() => handleAddToCart(puzzle)}
                        disabled={!puzzle.inStock}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                          puzzle.inStock
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {puzzle.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                      <button
                        onClick={() => handlePuzzleClick(puzzle)}
                        className="px-4 py-3 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {sortedPuzzles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No puzzles found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedPieceCategory('All Pieces');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        puzzle={selectedPuzzle}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPuzzle(null);
        }}
      />
    </div>
  );
};

export default Store;