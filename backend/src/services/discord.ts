export default async function discordSender({
  firstName,
  lastName,
  email,
  ServiceType,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  ServiceType: string;
  message: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const embedPayload = {
    embeds: [
      {
        title: "📩 New Website Inquiry",
        color: 0x3b82f6,
        fields: [
          {
            name: "👤 Name",
            value: `${firstName} ${lastName}`,
            inline: true,
          },
          {
            name: "📧 Email",
            value: `[${email}](mailto:${email})`,
            inline: true,
          },
          {
            name: "🌐 Service Requested",
            value: `\`${ServiceType}\``,
            inline: false,
          },
          {
            name: "💬 Message Details",
            value: `>>> ${message}`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Website Contact Form",
        },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(embedPayload),
  });
}
