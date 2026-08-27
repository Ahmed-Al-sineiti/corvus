import { da } from "zod/locales";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: any) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      `Telegram API Error: ${data.description || "Unknown error"}`,
    );
    return data;
  }
}
