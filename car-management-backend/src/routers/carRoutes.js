import express from 'express';
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars
} from '../controllers/carControllers.js';
import auth from '../middleware/authMiddleware.js'; // Middleware to check authentication

const router = express.Router();

// Route to create a new car (requires authentication)
router.post('/create', auth, createCar);

// Route to get all cars for the logged-in user
router.get('/mycars', auth, getCars);

// Route to get a specific car by ID
router.get('/:id', auth, getCarById);

// Route to update a specific car by ID
router.put('/:id', auth, updateCar);

// Route to delete a specific car by ID
router.delete('/:id', auth, deleteCar);

// Route to search for cars based on keyword in title, description, or tags
router.get('/search', auth, searchCars);

export default router;
