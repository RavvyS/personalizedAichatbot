// server/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Fix: Update CORS for Vite's default port
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite runs on 5173!
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ Gemini API Key loaded: ${process.env.GEMINI_API_KEY ? 'Yes' : 'No'}`);
});