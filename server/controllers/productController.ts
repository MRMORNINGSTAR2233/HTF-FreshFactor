import { Request, Response } from 'express';
import { getProductNutrition } from '../services/openFoodFacts';
import Product from '../models/Product';

// Get product details from OpenFoodFacts API
export const getProductDetails = async (req: Request, res: Response) => {
    const barcode = req.params.barcode;  // Access barcode from req.params

    try {
        // Get nutrition data from OpenFoodFacts
        const nutritionData = await getProductNutrition(barcode);

        if (nutritionData) {
            // If product found, send success response
            res.status(200).json(nutritionData);
        } else {
            // If product not found, send 404 error
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        // Catch any error and send 500 status
        res.status(500).json({ message: 'Error retrieving product details', error });
    }
};

// Save product data to the database
export const saveProduct = async (req: Request, res: Response) => {
    const { barcode, product_name, nutrients } = req.body;

    const newProduct = new Product({ barcode, product_name, nutrients });

    try {
        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);  // Return the saved product with 201 status
    } catch (error) {
        // Catch any error and send 500 status
        res.status(500).json({ message: 'Failed to save product', error });
    }
};

// Get product from the database by barcode
export const getProductByBarcode = async (req: Request, res: Response) => {
    const { barcode } = req.params;  // Get barcode from params

    try {
        // Find the product in the database
        const product = await Product.findOne({ barcode });

        if (product) {
            // If product exists, return the product data
            res.status(200).json(product);
        } else {
            // If no product is found, send 404 error
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        // Handle any errors that occur while fetching the product
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};
