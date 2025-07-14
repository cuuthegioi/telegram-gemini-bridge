import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GEMINI_API_KEY!;

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'No response';
  } catch (err) {
    console.error('Gemini API Error', err);
    return 'Error calling Gemini';
  }
}
