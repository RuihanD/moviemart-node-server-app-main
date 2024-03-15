import { Router } from 'express';
const router = Router();
import Movie from '../models/movieModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// add a movie
router.post('/', authMiddleware, async (req, res) => {

    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
                success: true,
                message: 'Movie added successfully',
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message,
            })
    }
});

// get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: 'Movies fetched successfully',
            data: movies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// update a movie
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Movie updated successfully',
            data: updatedMovie,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// delete a movie
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Movie deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get a movie by id
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.status(200).json({
                success: true,
                message: "Movie fetched successfully",
                data: movie,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Movie not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:error.message,
        });
    }
});

export default router;

