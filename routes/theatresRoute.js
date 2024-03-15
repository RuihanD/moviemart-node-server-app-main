import { Router } from 'express';
const router = Router();
import Theatre from '../models/theatreModel.js';
import Show from '../models/showModel.js';
import authMiddleware from "../middlewares/authMiddleware.js";

// add a theatre
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: 'Theatre added successfully',
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

// get all theatres
router.get('/', authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find().populate('owner').sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// update a theatre
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Theatre updated successfully',
            data: updatedTheatre,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// delete a theatre
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedTheatreId = req.params.id;
        await Theatre.findByIdAndDelete(deletedTheatreId);
        res.send({
            success: true,
            message: 'Theatre deleted successfully',
            data: deletedTheatreId,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get theatres by owner
router.get('/get-all-theatres-by-owner/:ownerId', authMiddleware, async (req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.params.ownerId}).sort({ createdAt: -1 });
        res.send({
            success: true,
            message: 'Theatres fetched successfully',
            data: theatres,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get all unique theatres which have shows of a movie
router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
    try {
        const { movie, date } = req.body;

        // find all shows of a movie
        const shows = await Show.find({ movie, date })
            .populate("theatre")
            .sort({ createdAt: -1 });

        // get all unique theatres
        let uniqueTheatres = [];
        shows.forEach((show) => {
            const theatre = uniqueTheatres.find(
                (theatre) => theatre._id === show.theatre._id
            );

            if (!theatre) {
                const showsForThisTheatre = shows.filter(
                    (showObj) => showObj.theatre._id === show.theatre._id
                );
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsForThisTheatre,
                });
            }
        });

        res.send({
            success: true,
            message: "Theatres fetched successfully",
            data: uniqueTheatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

export default router;

