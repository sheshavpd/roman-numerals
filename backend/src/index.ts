import express from 'express';
import dotenv from 'dotenv';
import romanRouter from './routes/roman.router.js';
import { logger } from './utils/logger.js';
import { register } from './utils/metrics.js';
import { metricsMiddleware } from './middleware/metricsMiddleware.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
// Log each request
app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use(metricsMiddleware);

app.use('/romannumeral', romanRouter);

app.get('/metrics', async (_, res) => {
  try {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch {
    res.status(500).end('Could not load metrics');
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
