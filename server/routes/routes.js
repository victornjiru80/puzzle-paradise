import express from 'express';
import { 
  getAllProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getImageKitAuth
} from '../controllers/productController.js';
import { 
  adminLogin, 
  createAdmin, 
  verifyAdmin 
} from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.get('/imagekit-auth', getImageKitAuth);

// Admin auth routes
router.post('/admin/login', adminLogin);
router.post('/admin/create', createAdmin);
router.get('/admin/verify', authenticateAdmin, verifyAdmin);

// Protected admin routes
router.post('/admin/products', authenticateAdmin, upload.single('image'), createProduct);
router.put('/admin/products/:id', authenticateAdmin, upload.single('image'), updateProduct);
router.delete('/admin/products/:id', authenticateAdmin, deleteProduct);

export default router;