import axios from 'axios';
import { getContextualResponse } from '../../data/ravinduData.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    console.log('Received message:', message);
    
    // Quick responses
    const quickResponses = {
      'hello': `Hi! I'm Ravindu S Hemachandra, a Software Engineer and IT student at SLIIT. How can I help you today?`,
      'projects': `I've worked on several exciting projects including an Employee Management System with React and MongoDB, a Vehicle Service Management System with Java, and a Boat Safari Management System. Which one would you like to know more about?`,
      'skills': `I'm proficient in full-stack development with expertise in React, Next.js, Express.js, and databases like MongoDB and MySQL.`,
      'contact': `You can reach me at ravindusdc@gmail.com or call +94 77 602 7643.`,
      'experience': `I worked as a Banking Associate at National Development Bank from May 2022 to Jan 2023.`,
      'education': `I'm currently pursuing my BSc (Hons) in Information Technology at SLIIT (2023-2027).`
    };
    
    // Check for quick responses
    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(quickResponses)) {
      if (lowerMessage.includes(key)) {
        return res.status(200).json({ response });
      }
    }
    
    // Use Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(200).json({ 
        response: "I'm Ravindu, a Software Engineer. Feel free to ask about my projects, skills, or contact me at ravindusdc@gmail.com!" 
      });
    }
    
    const context = getContextualResponse(message);
    
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: context + "\n\nUser Question: " + message + "\n\nProvide a helpful response as Ravindu:"
          }]
        }]
      }
    );
    
    res.status(200).json({
      response: geminiResponse.data.candidates[0].content.parts[0].text
    });
    
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(200).json({
      response: "I'm Ravindu, a Software Engineer passionate about full-stack development. Feel free to ask about my projects or reach me at ravindusdc@gmail.com!"
    });
  }
}