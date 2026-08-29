import { Client, GatewayIntentBits, Guild, TextChannel } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("guildCreate", async (guild: Guild): Promise<void> => {
  const me = guild.members.me;
  if (!me) return;

  const channel = guild.channels.cache.find(
    (ch) => ch.isTextBased() && ch.permissionsFor(me).has("SendMessages"),
  );

  if (channel) {
    await (channel as TextChannel).send(
      `👋 أهلاً بكم في سيرفر **${guild.name}**! شكراً لإضافتي. أنا جاهز للعمل!`,
    );
  }
});

client.login(process.env.DISCORD_TOKEN);
