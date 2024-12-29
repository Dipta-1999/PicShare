
import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  favorites: [{ type: String, ref: 'User' }],
});

const Picture = mongoose.model('Picture', PictureSchema);

export default Picture;