import { bold, Client, italic, TextChannel } from 'discord.js';
import RssFeedEmitter from 'rss-feed-emitter';
import { feedHashAndChannels } from '../scripts/feed-emmiter';

interface FeedItem {
  title: string;
  link: string;
  description: string;
  categories: string[];
  pubDate: Date;
}

export const onFeedEmmit = async (feeder: RssFeedEmitter, client: Client) => {
  feeder.on('error', console.error);

  feedHashAndChannels.forEach(async (channels, feedHash) => {
    feeder.on(feedHash, async (item: FeedItem) => {
      for (const channelId of channels) {
        const channel = (await client.channels.fetch(channelId)) as TextChannel;

        await channel.send({
          content: `${bold(item.title)}\n\n${item.link}\n\n ${italic('Tags: [' + item.categories + ']')}`,
        });
      }
    });
  });
};
