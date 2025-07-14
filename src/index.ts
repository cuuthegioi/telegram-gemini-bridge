import express from 'express';
import dotenv from 'dotenv';
import TelegramBot, { Message } from 'node-telegram-bot-api';
dotenv.config();
import { handleMessage } from './gemini';
import { splitMessage } from './helper';

const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  const reply = await handleMessage('', message);
  res.send({ reply });
});


const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id;
  const userText = msg.text || '';
  const reply = await handleMessage(msg.from?.username?.toString() || '', userText);
  const chunks = splitMessage(reply);
  for (const chunk of chunks) {
    bot.sendMessage(chatId, chunk);
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));
