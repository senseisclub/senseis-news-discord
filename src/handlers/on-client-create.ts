import { Client, Events } from 'discord.js';
import { GuildModel } from '../databases/mongo/models/guild';

export const onClientCreated = (client: Client) => {
  client.on(Events.GuildCreate, async (guild) => {
    await GuildModel.create({ guildId: guild.id, guildName: guild.name });
  });
};
