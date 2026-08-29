import { Client, GatewayIntentBits, Guild, TextChannel } from "discord.js";

export default async function discordSender(discordText: string) {
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
      await (channel as TextChannel).send(discordText);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
}
