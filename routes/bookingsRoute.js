import authMiddleware from "../middlewares/authMiddleware.js";
import Booking from "../models/bookingModel.js";
import Show from "../models/showModel.js";
import { Router } from 'express';
const router = Router();
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.stripe_key);

// get all bookings by user
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId })
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate("user")
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres",
                },
            });

        res.send({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// make a payment
router.post("/make-payment", authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const charge = await stripe.charges.create({
            amount: amount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "Ticket Booked for Movie",
        });

        const transactionId = charge.id;

        res.send({
            success: true,
            message: "Payment successful",
            data: transactionId,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// book shows
router.post("/book-show", authMiddleware, async (req, res) => {
    try {
        // save booking
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);
        // update seats
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...show.bookedSeats, ...req.body.seats],
        });

        res.send({
            success: true,
            message: "Show booked successfully",
            data: newBooking,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

export default router;