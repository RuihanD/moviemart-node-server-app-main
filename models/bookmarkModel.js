import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userId: String,
    movieId: String
}, { timestamps: true });

export default mongoose.model("bookmarks", bookmarkSchema);