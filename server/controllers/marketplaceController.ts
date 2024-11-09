import { Request, Response } from 'express';
import MarketplaceItem from '../models/MarketplaceItem';

// Create a new marketplace item
export const createMarketplaceItem = async (req: Request, res: Response) => {
  const { sellerId, product_name, description, price, quantity, category, image_url } = req.body;

  const newItem = new MarketplaceItem({ sellerId, product_name, description, price, quantity, category, image_url });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create marketplace item', error });
  }
};

// Get all marketplace items
export const getAllMarketplaceItems = async (req: Request, res: Response) => {
  try {
    const items = await MarketplaceItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve marketplace items', error });
  }
};

// Get marketplace items by seller
export const getMarketplaceItemsBySeller = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  try {
    const items = await MarketplaceItem.find({ sellerId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve items', error });
  }
};

// Delete a marketplace item
export const deleteMarketplaceItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await MarketplaceItem.findByIdAndDelete(itemId);
    deletedItem
      ? res.status(200).json({ message: 'Marketplace item deleted' })
      : res.status(404).json({ message: 'Item not found' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete marketplace item', error });
  }
};
