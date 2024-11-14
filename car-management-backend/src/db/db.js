import mongoose from 'mongoose';
//import { DB_NAME } from '../constants';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
