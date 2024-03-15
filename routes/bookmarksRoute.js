import { Router } from 'express';
const router = Router();
import ExternalMovie from '../models/externalMovieModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Bookmark from '../models/bookmarkModel.js';
import User from '../models/userModel.js';

// create a bookmark
router.post('/:userId/:movieId', authMiddleware, async (req, res) => {
    try {
        // if movie already exists, don't save it again
        const externalMovie = await ExternalMovie.findOne({ movieId: req.params.movieId });
        if (!externalMovie) {
            const newExternalMovie = new ExternalMovie({
                movieId: req.params.movieId,
                name: req.body.name,
                poster_path: req.body.poster,
                bookmarksCount: 1,
            });
            await newExternalMovie.save();
        } else {
            // bookmark already exists, increment count
            externalMovie.bookmarksCount++;
            await externalMovie.save();
        }

        // create new bookmark
        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const newBookmark = new Bookmark({
            userId,
            movieId,
        });
        await newBookmark.save();

        res.status(200).json({
            success: true,
            message: 'External movie added successfully',
            data: newBookmark,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// check if a user has bookmarked a movie
router.get('/get-user-bookmarked/:userId/:movieId', authMiddleware, async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            userId: req.params.userId,
            movieId: req.params.movieId,
        });
        if (bookmark) {
            res.status(200).json({
                success: true,
                message: 'Bookmark found',
                data: bookmark,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Bookmark not found',
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get all bookmarked movies
router.get('/all',  async (req, res) => {
    try {
        const bookmarkedMovies = await ExternalMovie.find().sort({'bookmarksCount': -1});
        res.status(200).json({
            success: true,
            message: 'Bookmarked movies fetched successfully',
            data: bookmarkedMovies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get all bookmarks for a user
router.get('/get-bookmarks-by-user/:userId', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.params.userId });
        let bookmarkedMovies = [];
        for (let i = 0; i < bookmarks.length; i++) {
            const externalMovie = await ExternalMovie.findOne({
                movieId: bookmarks[i].movieId,
            });
            bookmarkedMovies[i] = externalMovie;
        }
        res.status(200).json({
            success: true,
            message: 'Bookmarks fetched successfully',
            data: bookmarkedMovies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get all users who have bookmarked a movie
router.get('/get-users-by-movie/:movieId', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ movieId: req.params.movieId });
        const users = [];
        const usersIds = [];

        for (let i = 0; i < bookmarks.length; i++) {
            usersIds[i] = bookmarks[i].userId;
        }
        for (let i = 0; i < usersIds.length; i++) {
            const user = await User.findOne({ _id: usersIds[i] });
            users[i] = user;
        }

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



export default router;
