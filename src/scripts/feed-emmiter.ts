import { bold, Client, italic, TextChannel } from 'discord.js';
import RssFeedEmitter from 'rss-feed-emitter';
import { FeedModel } from '../databases/mongo/models/feeds';
import { TagModel } from '../databases/mongo/models/tags';
import { Utils } from '../utils/utils';

const feeder = new RssFeedEmitter({ skipFirstLoad: true });
const twelveHours = 43200000;

interface FeedItem {
  title: string;
  link: string;
  description: string;
  categories: string[];
  pubDate: Date;
}

export const syncFeedLinks = async (client: Client) => {
  const feeds = await FeedModel.find().distinct('link').exec();

  for (const feed of feeds) {
    addFeed(client, feed);
  }
};

export function addFeed(client: Client, link: string) {
  const hasFeedEvent = feeder.list.some((feed) => feed.eventName === link);

  if (!hasFeedEvent) {
    feeder.add({ url: link, refresh: twelveHours, eventName: link });
    addFeedListener(client, link);
  }
}

export const addFeedListener = (client: Client, link: string) => {
  feeder.on(link, async (item: FeedItem) => {
    const feeds = await FeedModel.find({ link }).populate('guild');

    for (const feed of feeds) {
      if (feed.guild.channelId) {
        const tags = await TagModel.find({ guild: feed.guild }).exec();

        const hasFeedTag =
          tags.length == 0 ||
          item.categories.length == 0 ||
          tags.some((tag) => item.categories.some((categorie) => Utils.compareString(categorie, tag.tag)));

        if (hasFeedTag) {
          const channel = (await client.channels.fetch(feed.guild.channelId)) as TextChannel;

          await channel.send({
            content: `${bold(item.title)}\n\n${item.link}\n\n ${italic('Tags: [' + item.categories + ']')}`,
          });
        }
      }
    }
  });
};
