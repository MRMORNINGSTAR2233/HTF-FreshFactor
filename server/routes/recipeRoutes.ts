import express from 'express';
import { createRecipe } from '../controllers/recipeController';

const router = express.Router();

router.post('/generate', createRecipe);

export default router;
