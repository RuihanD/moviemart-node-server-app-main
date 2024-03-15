import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
import userRoute from './routes/usersRoute.js';
import movieRoute from './routes/moviesRoute.js';
import theatreRoute from './routes/theatresRoute.js';
import showsRoute from './routes/showsRoute.js';
import bookingsRoute from './routes/bookingsRoute.js';
import bookmarksRoute from './routes/bookmarksRoute.js';

app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/theatres', theatreRoute);
app.use('/api/shows', showsRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/bookmarks', bookmarksRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node.js server is running on port ${port}`));