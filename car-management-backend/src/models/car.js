import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'], // Limit to 10 images
  },
  tags: {
    type: [String], // Array of tags (e.g., car type, features)
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  }, 
},
{ timestamps: true });

// Helper function to enforce image array length limit
function arrayLimit(val) {
  return val.length <= 10;
}

export default mongoose.model('Car', CarSchema);
