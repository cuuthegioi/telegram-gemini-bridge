import { db } from './db';

export async function storeMessage(userId: string, role: string, content: string) {
  return db.message.create({
    data: { userId, role, content }
  });
}

export async function getRecentMessages(userId: string, limit = 6) {
  const messages = await db.message.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    take: limit,
  });

  //FIXME: fix this type
  return messages.map((m: any) => ({
    role: m.role,
    parts: [{ text: m.content }]
  }));
}