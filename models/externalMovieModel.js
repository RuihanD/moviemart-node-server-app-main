import mongoose from "mongoose";

const externalMovieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    bookmarksCount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("externalMovies", externalMovieSchema);
