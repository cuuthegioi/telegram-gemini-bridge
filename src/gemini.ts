import { GoogleGenAI } from '@google/genai';
//TODO:
// import { getRecentMessages, storeMessage } from './lib/memory';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export async function handleMessage(userId: string, userInput: string) {
  const systemPrompt = {
    role: 'user',
    parts: [
      {
        text: 'You are a helpful assistant answering as a senior fullstack developer. Be concise, precise, and practical.'
      }
    ]
  };

  // const history = await getRecentMessages(userId);
  // const prompt = [systemPrompt, ...history, { role: 'user', parts: [{ text: userInput }] }];

  try {
    const response = await genAI.models.generateContent({ contents: { role: 'user', parts: [{ text: userInput }] }, model: 'gemini-2.0-flash' });
    console.log('response', response)
    // const result = response.text();
    // await storeMessage(userId, 'user', userInput);
    // await storeMessage(userId, 'model', result);
    if (!response.text) {
      return 'No response from Gemini';
    }

    return response.text;
  } catch (error) {
    console.error('Gemini API Error', error);
    return 'Error calling Gemini';
  }

}


// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   telegram_id TEXT UNIQUE NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Table: messages
// CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   role TEXT CHECK (role IN ('user', 'assistant')),
//   content TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Table: meta_prompts (optional)
// CREATE TABLE meta_prompts (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   prompt TEXT NOT NULL,
//   active BOOLEAN DEFAULT TRUE,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );