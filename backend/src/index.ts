import express from 'express';
import dotenv from 'dotenv';
import romanRouter from './routes/roman.router';
import { logger } from './utils/logger';
import { register } from './utils/metrics';
import { metricsMiddleware } from './middleware/metricsMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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
