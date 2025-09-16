import { Product } from '../models/models.js';
import imagekit from '../lib/imagekit.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { type, category, pieces } = req.query;
    let filter = {};
    
    if (type) filter.type = type;
    if (category && category !== 'All') filter.category = category;
    if (pieces && pieces !== 'All Pieces') {
      const pieceCount = parseInt(pieces.split(' ')[0]);
      filter.pieces = pieceCount;
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      originalPrice,
      pieces,
      category,
      difficulty,
      inStock,
      featured,
      type,
      duration,
      level,
      instructor,
      maxParticipants,
      schedule
    } = req.body;

    let imageUrl = '';
    let imageId = '';

    // Handle image upload if provided
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: '/puzzle-paradise/products'
      });
      imageUrl = result.url;
      imageId = result.fileId;
    }

    const product = new Product({
      title,
      description,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      pieces: pieces ? Number(pieces) : undefined,
      category,
      difficulty,
      image: imageUrl,
      imageId,
      inStock: inStock === 'true',
      featured: featured === 'true',
      type: type || 'puzzle',
      duration,
      level,
      instructor,
      maxParticipants: maxParticipants ? Number(maxParticipants) : undefined,
      schedule
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updateData = { ...req.body };
    
    // Convert string numbers to actual numbers
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = Number(updateData.originalPrice);
    if (updateData.pieces) updateData.pieces = Number(updateData.pieces);
    if (updateData.maxParticipants) updateData.maxParticipants = Number(updateData.maxParticipants);
    
    // Convert string booleans to actual booleans
    if (updateData.inStock) updateData.inStock = updateData.inStock === 'true';
    if (updateData.featured) updateData.featured = updateData.featured === 'true';

    // Handle image upload if new image provided
    if (req.file) {
      // Delete old image if exists
      if (product.imageId) {
        try {
          await imagekit.deleteFile(product.imageId);
        } catch (deleteError) {
          console.log('Error deleting old image:', deleteError);
        }
      }

      // Upload new image
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: '/puzzle-paradise/products'
      });
      updateData.image = result.url;
      updateData.imageId = result.fileId;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete image from ImageKit if exists
    if (product.imageId) {
      try {
        await imagekit.deleteFile(product.imageId);
      } catch (deleteError) {
        console.log('Error deleting image:', deleteError);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get ImageKit auth parameters
export const getImageKitAuth = async (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
