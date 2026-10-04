import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Config/db.js';
import userRouter from './Routes/UserRoutes.js';
import cookieParser from 'cookie-parser';
import imageRouter from './Routes/ImageRoutes.js';
import generationRouter from './Routes/GenerationRoutes.js';



const app = express();
await connectDB()


app.use(
  cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('API is Running!');
});


app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/image', generationRouter);

// IT WORK LOCALLY

// const PORT = 4000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
  message: err.message || 'Internal Server Error'
  });
});

export default app;