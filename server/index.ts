import express , {Application}from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {connectDB} from './config/db';
import productRoutes from './routes/productRoutes';
import recipeRoutes from './routes/recipeRoutes';
import healthRoutes from './routes/healthRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/health', healthRoutes);
app.use('api/marketplace',marketplaceRoutes);
app.listen(PORT,()=>console.log(`Server running on the port ${PORT}`));