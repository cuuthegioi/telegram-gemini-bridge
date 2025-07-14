import express from 'express';
import dotenv from 'dotenv';
import TelegramBot, { Message } from 'node-telegram-bot-api';
dotenv.config();
import { askGemini } from './gemini';

const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  const reply = await askGemini(message);
  res.send({ reply });
});


const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id;
  const userText = msg.text || '';
  const reply = await askGemini(userText);
  bot.sendMessage(chatId, reply);
});


app.listen(3000, () => console.log('Server running on port 3000'));
