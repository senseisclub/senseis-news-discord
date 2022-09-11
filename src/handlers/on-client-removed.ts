import { Client, Events } from 'discord.js';
import { ChannelModel } from '../databases/mongo/models/channels';
import { FeedModel } from '../databases/mongo/models/feeds';
import { GuildModel } from '../databases/mongo/models/guild';
import { TagModel } from '../databases/mongo/models/tags';

export const onClientRemoved = (client: Client) => {
  client.on(Events.GuildDelete, async (guild) => {
    const guildRemoved = await GuildModel.remove({ guildId: guild.id }).exec();

    await ChannelModel.remove({ guild: guildRemoved._id }).exec();
    await FeedModel.remove({ guild: guildRemoved._id }).exec();
    await TagModel.remove({ guild: guildRemoved._id }).exec();
  });
};
