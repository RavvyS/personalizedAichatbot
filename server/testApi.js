import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');

async function testGeminiAPI() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: "Say hello in one sentence"
          }]
        }]
      }
    );
    
    console.log('✅ API works! Response:', response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error.message);
  }
}

testGeminiAPI();