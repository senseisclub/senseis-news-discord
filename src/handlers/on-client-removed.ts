import { Client, Events } from 'discord.js';
import { FeedModel } from '../databases/mongo/models/feeds';
import { GuildModel } from '../databases/mongo/models/guild';
import { TagModel } from '../databases/mongo/models/tags';

export const onClientRemoved = (client: Client) => {
  client.on(Events.GuildDelete, async (guild) => {
    const guildRemoved = await GuildModel.remove({ guildId: guild.id }).exec();

    await FeedModel.remove({ guild: guildRemoved._id }).exec();
    await TagModel.remove({ guild: guildRemoved._id }).exec();
  });
};
