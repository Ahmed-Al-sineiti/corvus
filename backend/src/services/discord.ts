export default async function discordSender(discordText: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not set in .env");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: discordText,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send Discord webhook: ${response.statusText}`);
  }
}
