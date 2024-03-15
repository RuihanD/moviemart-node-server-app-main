import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send({
            success: false,
            message: 'Invalid token',
        });
    }
}

export default authMiddleware;