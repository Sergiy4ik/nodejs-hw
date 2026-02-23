import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import router from './routes/noteRoutes.js';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: "Note main-page" });
});

app.use(router);

// notFound middleware
app.use(notFoundHandler);

// error middleware
app.use(errorHandler);

//connecting MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server start with port: ${PORT}`);
});
