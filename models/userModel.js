import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isOwner: {
        type: Boolean,
        required: true,
        default: false,
    },
    isUser: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model("users", userSchema);
