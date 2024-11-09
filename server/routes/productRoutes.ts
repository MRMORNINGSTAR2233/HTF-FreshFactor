import express from 'express';
import { getProductDetails, saveProduct, getProductByBarcode } from '../controllers/productController';

const router = express.Router();

// Route to get product details from OpenFoodFacts
router.get('/:barcode/details', getProductDetails);

// Route to save a product to the database
router.post('/save', saveProduct);

// Route to get a product by barcode from the database
router.get('/:barcode', getProductByBarcode);

export default router;
