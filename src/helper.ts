const MAX_TELEGRAM_MSG_LENGTH = 4096;

export function splitMessage(message: string): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < message.length) {
    chunks.push(message.slice(i, i + MAX_TELEGRAM_MSG_LENGTH));
    i += MAX_TELEGRAM_MSG_LENGTH;
  }
  return chunks;
}