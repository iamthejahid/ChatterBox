import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db';  // Import the connectDB function

export const createServer = async ()  => { 
    // Load environment variables
    dotenv.config();

    // Create an instance of Express
    const server = express();

    // Middleware for parsing JSON bodies
    server.use(express.json());

    // CORS middleware to allow cross-origin requests
    server.use(cors());

    // HTTP request logger middleware (useful during development)
    server.use(morgan('dev'));

    // Connect to the database
    connectDB();

    // Example route to test the server
    server.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Chatterbox API!');
    });

    // Error handling middleware (for catching unhandled errors)
    server.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong!' });
    }
    );

    // Set up the port from environment variables
    const PORT = process.env.PORT || 5000;

    return server; 

};