// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Picture' }],
// });

// export default mongoose.model("User", userSchema);




import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Picture' }],
});

export default mongoose.model("User", userSchema);
