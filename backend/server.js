import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('db connected');
    console.log('connected to server');
  } catch (error) {
    console.log('.env not working');
  }
});

app.use('/api/v1/auth', userRouter);
