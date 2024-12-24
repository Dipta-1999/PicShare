import mongoose from "mongoose";

const pictureSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imagePath: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Picture", pictureSchema);