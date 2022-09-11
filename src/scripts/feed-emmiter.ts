import crypto from 'crypto';
import RssFeedEmitter from 'rss-feed-emitter';
import { FeedModel } from '../databases/mongo/models/feeds';

export const feedHashAndChannels = new Map<string, Array<string>>();

export const syncFeedLinks = async () => {
  const feeds = await FeedModel.find().populate('guild');
  const feeder = new RssFeedEmitter();

  for (const feed of feeds) {
    const hash = crypto.createHash('md5').update(feed.link).digest('hex');

    if (!feedHashAndChannels.has(hash)) {
      feedHashAndChannels.set(hash, []);
    }

    feedHashAndChannels.get(hash)?.push(feed.guild.channelId);

    feeder.add({ url: feed.link, refresh: getMsSixPm(), eventName: hash });
  }
};

function getMsSixPm() {
  const now = new Date();

  const nextSixAm = new Date(now);
  nextSixAm.setHours(18, 0, 0);

  if (now.getTime() > nextSixAm.getTime()) {
    nextSixAm.setDate(now.getDate() + 1);
  }

  return nextSixAm.getTime() - now.getTime();
}
