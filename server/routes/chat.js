import express from 'express';
import axios from 'axios';
import { ravinduData, getContextualResponse } from '../data/ravinduData.js';

const router = express.Router();

// Simple responses for common questions (no API needed)
const quickResponses = {
  'hello': `Hi! I'm Ravindu S Hemachandra, a Software Engineer and IT student at SLIIT. How can I help you today?`,
  'hi': `Hello there! I'm Ravindu, a passionate Software Engineer. What would you like to know about me?`,
  'project': `I've worked on several exciting projects including an Employee Management System with React and MongoDB, a Vehicle Service Management System with Java, and a Boat Safari Management System. Which one would you like to know more about?`,
  'skill': `I'm proficient in full-stack development with expertise in React, Next.js, Express.js, and databases like MongoDB and MySQL. I also have experience with cloud platforms like Vercel and tools like Docker.`,
  'contact': `You can reach me at ravindusdc@gmail.com or call +94 77 602 7643. Also feel free to connect on LinkedIn or check out my GitHub!`,

};

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();
    
    // Check for quick responses first
    for (const [key, response] of Object.entries(quickResponses)) {
      if (lowerMessage.includes(key)) {
        return res.json({ response });
      }
    }
    
    // Use Gemini API for complex queries
    const context = getContextualResponse(message);
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ 
        response: "I'd love to tell you more about myself! Currently, my AI features are limited, but you can still ask about my projects, skills, experience, or education. Feel free to contact me directly at ravindusdc@gmail.com!" 
      });
    }
    
    // UPDATED: Using gemini-1.5-flash instead of gemini-pro
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: context + "\n\nUser Question: " + message + "\n\nProvide a helpful, personalized response as Ravindu in 2-3 sentences:"
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
        }
      }
    );
    
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    // Fallback response
    res.json({ 
      response: `I'm Ravindu, a Software Engineer passionate about full-stack development. While I'm having trouble with that specific question, feel free to ask about my projects, skills, or experience! You can also reach me at ravindusdc@gmail.com.` 
    });
  }
});

router.get('/info', (req, res) => {
  res.json(ravinduData);
});

// IMPORTANT: Add default export!
export default router;