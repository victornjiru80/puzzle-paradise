import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Filter,
  LogOut,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [puzzles, setPuzzles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPuzzle, setEditingPuzzle] = useState(null);

  // Initialize with sample data (in production, this would come from an API)
  useEffect(() => {
    const initialPuzzles = [
      {
        id: 1,
        title: "Mountain Landscape",
        description: "Breathtaking mountain scenery with crystal clear lakes and snow-capped peaks.",
        pieces: 300,
        price: 2450,
        originalPrice: 2950,
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
        category: "Adult Puzzles",
        difficulty: "Medium",
        inStock: true,
        featured: true
      },
      {
        id: 3,
        title: "Cute Farm Animals",
        description: "Adorable collection of farm animals perfect for children to learn and enjoy.",
        pieces: 300,
        price: 2050,
        originalPrice: 2550,
        category: "Kids Puzzles",
        difficulty: "Easy",
        inStock: true,
        featured: true
      }
    ];
    setPuzzles(initialPuzzles);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    onLogout();
    navigate('/admin/login');
  };

  const filteredPuzzles = puzzles.filter(puzzle => {
    const matchesSearch = puzzle.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || puzzle.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalPuzzles: puzzles.length,
    inStock: puzzles.filter(p => p.inStock).length,
    outOfStock: puzzles.filter(p => !p.inStock).length,
    featured: puzzles.filter(p => p.featured).length
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Puzzle Paradise Admin</h1>
            <p className="text-gray-400">Manage your puzzle inventory</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              View Website
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Puzzles</p>
                <p className="text-3xl font-bold text-white">{stats.totalPuzzles}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Stock</p>
                <p className="text-3xl font-bold text-green-500">{stats.inStock}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Out of Stock</p>
                <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
              </div>
              <Package className="w-8 h-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Featured</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.featured}</p>
              </div>
              <Users className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search puzzles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Categories</option>
                <option value="Adult Puzzles">Adult Puzzles</option>
                <option value="Kids Puzzles">Kids Puzzles</option>
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Puzzle
            </button>
          </div>
        </div>

        {/* Puzzles Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Puzzle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pieces
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPuzzles.map((puzzle) => (
                  <tr key={puzzle.id} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{puzzle.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {puzzle.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400">
                        {puzzle.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{puzzle.pieces}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">KES {puzzle.price.toLocaleString()}</div>
                      {puzzle.originalPrice > puzzle.price && (
                        <div className="text-xs text-gray-400 line-through">
                          KES {puzzle.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          puzzle.inStock 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {puzzle.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        {puzzle.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/10 text-yellow-400">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPuzzle(puzzle)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this puzzle?')) {
                              setPuzzles(puzzles.filter(p => p.id !== puzzle.id));
                            }
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPuzzles.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No puzzles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal would go here */}
      {(showAddModal || editingPuzzle) && (
        <PuzzleModal
          puzzle={editingPuzzle}
          onClose={() => {
            setShowAddModal(false);
            setEditingPuzzle(null);
          }}
          onSave={(puzzleData) => {
            if (editingPuzzle) {
              // Update existing puzzle
              setPuzzles(puzzles.map(p => 
                p.id === editingPuzzle.id ? { ...puzzleData, id: editingPuzzle.id } : p
              ));
            } else {
              // Add new puzzle
              const newPuzzle = {
                ...puzzleData,
                id: Math.max(...puzzles.map(p => p.id), 0) + 1
              };
              setPuzzles([...puzzles, newPuzzle]);
            }
            setShowAddModal(false);
            setEditingPuzzle(null);
          }}
        />
      )}
    </div>
  );
};

// Puzzle Modal Component
const PuzzleModal = ({ puzzle, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: puzzle?.title || '',
    description: puzzle?.description || '',
    pieces: puzzle?.pieces || 300,
    price: puzzle?.price || 0,
    originalPrice: puzzle?.originalPrice || 0,
    category: puzzle?.category || 'Adult Puzzles',
    difficulty: puzzle?.difficulty || 'Easy',
    inStock: puzzle?.inStock ?? true,
    featured: puzzle?.featured ?? false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            {puzzle ? 'Edit Puzzle' : 'Add New Puzzle'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Adult Puzzles">Adult Puzzles</option>
                  <option value="Kids Puzzles">Kids Puzzles</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pieces
                </label>
                <select
                  name="pieces"
                  value={formData.pieces}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={300}>300</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (KES)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original Price (KES)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="mr-2 rounded"
                />
                <span className="text-gray-300">In Stock</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2 rounded"
                />
                <span className="text-gray-300">Featured</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                {puzzle ? 'Update Puzzle' : 'Add Puzzle'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
