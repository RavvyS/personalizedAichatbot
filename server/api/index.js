import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chatRoutes from '../routes/chat.js';

const app = express();

// IMPORTANT: Configure CORS for Vercel
app.use(cors({
  origin: [
    'https://ravindu-ai-chatbot.vercel.app',
    'https://ravindu-ai-chatbot-*.vercel.app', // Preview deployments
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).send();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Ravindu AI Chatbot API is running!' });
});

app.use('/api/chat', chatRoutes);

// IMPORTANT: Export for Vercel
export default app;