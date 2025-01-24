import express from 'express';
import dotenv from 'dotenv';
import romanRouter from './routes/roman.router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/romannumeral', romanRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
