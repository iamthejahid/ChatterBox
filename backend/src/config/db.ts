import { Client } from "pg";
import dotenv from 'dotenv';


dotenv.config();


// Initialize the client (but don't connect immediately)
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"), 
});

// console.log(client);  

// Function to connect to the database
export const connectDB = async () => {
  try {
    await client.connect();  // Connect only once
    console.log("Connected to the PostgreSQL database!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);  // Exit the process on failure
  }
};

// Function to execute SQL queries
export const executeSQL = async (sql: string, params?: any[]) => {
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;  // Rethrow the error so it can be caught at higher levels
  }
};

// Function to get the database client (useful for direct queries if needed)
export const getDBClient = () => client;
