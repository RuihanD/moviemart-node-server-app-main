import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
const router = Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

// register
router.post('/register', async (req, res) => {
    try {
        // check if user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // create user
        const newUser = await User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: 'Register successfully, please login',
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User does not exist',
            });
        }

        // check if password is correct
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) {
            return res.send({
                success: false,
                message: 'Invalid password',
            });
        }

        // create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
            expiresIn: "10d",
          });

        // login successfully
        res.send({ 
            success: true, 
            message: 'Login successfully' ,
            data: token
        });

    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

// get current user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('-password');
        res.send({
            success: true,
            message: 'Get user successfully',
            data: user,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});

// update personal information
router.put("/update-personal-info", authMiddleware, async (req, res) => {
    try {
        const existingUser = await User.findOne({email: req.body.email});

        if (existingUser && existingUser._id.toString() !== req.body._id) {
            res.send({
                success: false,
                message: "The email already exists",
            });
            return;
        }

        const updatedPersonalInformation = await User.findByIdAndUpdate(
            req.body._id,
            req.body,
            { new: true }
        );

        res.send({
            success: true,
            message: "Update information successfully",
            data: updatedPersonalInformation,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// get user by id
router.get('/get-user-by-id/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.send({
            success: true,
            message: 'Get user successfully',
            data: user,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }
});
        

export default router;