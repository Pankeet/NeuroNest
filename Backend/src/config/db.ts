import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDb = async () => {
    try {
        const mongoURL  = process.env.MONGO_URL;

        if (!mongoURL) {
            throw new Error("MONGO_URL is not defined in environment variables.");
        }

        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
        
    } catch (err) {
        if(err instanceof Error){
            console.error(` MongoDB Connection Error: ${err.message}`);
            process.exit(1);
        }
    }
};
