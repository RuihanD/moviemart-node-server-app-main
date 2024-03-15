import mongoose from 'mongoose';

const theatreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model('theatres', theatreSchema);