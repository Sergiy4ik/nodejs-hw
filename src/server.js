import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';

import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// all middleware
app.use(notesRouter);
app.use(authRouter);
app.use(userRouter);

// notFound middleware
app.use(notFoundHandler);

// validations errors
app.use(errors());

// error middleware
app.use(errorHandler);

//connecting MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server start with port: ${PORT}`);
});
