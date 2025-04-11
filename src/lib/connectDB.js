// connectDb.js
import mongoose from "mongoose";

export default async function connectDB() {
  try {
    // Make sure all required environment variables are loaded
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }
    
    if (!process.env.DBNAME) {
      throw new Error("DBNAME environment variable is not defined");
    }
    
    const DB_OPTIONS = {
      dbName: process.env.DBNAME,
      // Only include credentials if they are provided
      ...(process.env.DBUSERNAME && { user: process.env.DBUSERNAME }),
      ...(process.env.DBPASSWORD && { pass: process.env.DBPASSWORD }),
      ...(process.env.DBAUTHSOURCE && { authSource: process.env.DBAUTHSOURCE })
    };

    await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS);
    console.log("MongoDB connected successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw to handle it at the call site if needed
  }
}