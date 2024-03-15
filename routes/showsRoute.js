import { Router } from 'express';
const router = Router();
import Show from "../models/showModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// add show
router.post("/", authMiddleware, async (req, res) => {
    try {
        const newShow = new Show(req.body);
        await newShow.save();
        res.status(200).json({
            success: true,
            message: "Show added successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get show by id
router.get("/:showId", authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.params.showId)
            .populate("movie")
            .populate("theatre");
            res.status(200).json({
            success: true,
            message: "Show fetched successfully",
            data: show,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// get all shows by theatre
router.get("/get-shows-by-theatre/:id", authMiddleware, async (req, res) => {
    try {
        const shows = await Show.find({ theatre: req.params.id })
            .populate("movie")
            .sort({
                createdAt: -1,
            });

            res.status(200).json({
            success: true,
            message: "Shows fetched successfully",
            data: shows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// delete show
router.delete("/:showId", authMiddleware, async (req, res) => {
    try {
        await Show.findByIdAndDelete(req.params.showId);
        res.status(200).json({
            success: true,
            message: "Show deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;