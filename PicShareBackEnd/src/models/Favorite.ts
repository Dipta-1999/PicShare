import mongoose, { Schema, Document } from 'mongoose';

interface FavoriteDocument extends Document {
  username: string;
  pictureId: string;
}

const favoriteSchema = new Schema({
  username: { type: String, ref: 'User', required: true },
  pictureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Picture', required: true },
});

export default mongoose.model<FavoriteDocument>('Favorite', favoriteSchema);