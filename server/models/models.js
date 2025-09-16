import mongoose from 'mongoose';

// Product Schema for puzzles
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  pieces: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true,
    enum: ['Adult Puzzles', 'Kids Puzzles']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard', 'Expert']
  },
  image: {
    type: String,
    required: true
  },
  imageId: {
    type: String // ImageKit file ID for deletion
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['puzzle', 'class'],
    default: 'puzzle'
  },
  // For classes
  duration: {
    type: String // e.g., "2 hours", "1 day"
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  instructor: {
    type: String
  },
  maxParticipants: {
    type: Number
  },
  schedule: {
    type: String
  }
}, {
  timestamps: true
});

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema);
export const Admin = mongoose.model('Admin', adminSchema);