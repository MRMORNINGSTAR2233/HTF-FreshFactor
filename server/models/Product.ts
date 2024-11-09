import mongoose, {Document, Schema} from "mongoose";

interface IProduct extends mongoose.Document {
    barcode: string;
    product_name: string;
    nutrients:{
        energy: number;
        fat: number;
        carbohydrates: number;
        fiber: number;
        sugars:number;
        salt:number;
        [key: string]: number;
    };
}

const ProductSchema = new mongoose.Schema({
    barcode: { type: String, required: true, unique: true},
    product_name: { type: String, required: true},
    nutrients: {
        energy: { type: Number, required: true},
        fat: { type: Number, required: true},
        carbohydrates: { type: Number, required: true},
        fiber: { type: Number, required: true},
        sugars: { type: Number, required: true},
        salt: { type: Number, required: true},
    }
});

export default mongoose.model<IProduct>('Product', ProductSchema);