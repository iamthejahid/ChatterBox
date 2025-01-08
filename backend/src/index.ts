import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// import { connectDB } from './config/db';  // Import the connectDB function

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(cors());

// HTTP request logger middleware (useful during development)
app.use(morgan('dev'));

// Connect to the database
// connectDB();

// Example route to test the server
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Chatterbox API!');
});

// Error handling middleware (for catching unhandled errors)
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  }
);

// Set up the port from environment variables
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
