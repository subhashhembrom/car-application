import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Import the cors module
import connectDB from './src/db/db.js';
import authRoutes from './src/routers/authRoutes.js';
import carRoutes from './src/routers/carRoutes.js';
import uploadRouter from './src/utils/cloudinary.js'

const app = express();

// Use CORS middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN
})); // Allows all origins, you can configure it for specific domains if needed

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api',uploadRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
