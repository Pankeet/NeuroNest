import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db';
import userRouter from './controller/user';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1' , userRouter);

async function startServer(){
    try {
        await connectDb(); 
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port 3001');
        });
    } catch (error: any) {
        console.error('Failed to connect to MongoDB: ', error.message);
        process.exit(1); 
    }
}

startServer();