import crypto from 'crypto';
import { Client } from 'discord.js';
import RssFeedEmitter from 'rss-feed-emitter';
import { FeedModel } from '../databases/mongo/models/feeds';
import { onFeedEmmit } from '../handlers/on-feed-emmit';

export const feedHashAndChannels = new Map<string, Array<string>>();
export const feeder = new RssFeedEmitter();

const twentFouHours = 86400000;

export const syncFeedLinks = async (client: Client) => {
  const feeds = await FeedModel.find().populate('guild');

  for (const feed of feeds) {
    if (feed.guild.channelId) {
      const hash = crypto.createHash('md5').update(feed.link).digest('hex');

      if (!feedHashAndChannels.has(hash)) {
        feedHashAndChannels.set(hash, []);
      }

      feedHashAndChannels.get(hash)?.push(feed.guild.channelId);

      feeder.add({ url: feed.link, refresh: twentFouHours, eventName: hash });
    }
  }

  await onFeedEmmit(feeder, client);
};
