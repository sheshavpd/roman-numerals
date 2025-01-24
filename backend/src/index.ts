import express from 'express';
import dotenv from 'dotenv';
import romanRouter from './routes/roman.router';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Log each request
app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/romannumeral', romanRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
