import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Basic health check or root endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

