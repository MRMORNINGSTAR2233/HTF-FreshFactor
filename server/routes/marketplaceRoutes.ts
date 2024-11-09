import express from 'express';
import { createMarketplaceItem, getAllMarketplaceItems, getMarketplaceItemsBySeller, deleteMarketplaceItem } from '../controllers/marketplaceController';

const router = express.Router();

router.post('/create', createMarketplaceItem);
router.get('/', getAllMarketplaceItems);
router.get('/seller/:sellerId', getMarketplaceItemsBySeller);
router.delete('/:itemId', deleteMarketplaceItem);

export default router;
