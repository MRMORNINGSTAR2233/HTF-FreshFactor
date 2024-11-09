import mongoose, {Document, Schema} from "mongoose";

interface IHealthData extends Document{
    userId: mongoose.Types.ObjectId;
    foodConsumed: string[];
    healtSuggestions: string[];
}

const HealthDataSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    foodConsumed: [{ type: String}],
    healthSuggestions: [{ type: String}],

});

export default mongoose.model<IHealthData>('HealthData', HealthDataSchema);