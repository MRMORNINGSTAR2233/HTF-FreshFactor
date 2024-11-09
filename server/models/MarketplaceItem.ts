import mongoose, { Document, Schema } from 'mongoose';

interface IMarketplaceItem extends Document {
  sellerId: mongoose.Types.ObjectId;
  product_name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image_url?: string;  // URL for the product image, if applicable
  createdAt: Date;
}

const MarketplaceItemSchema: Schema = new Schema({
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String },
  image_url: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMarketplaceItem>('MarketplaceItem', MarketplaceItemSchema);
