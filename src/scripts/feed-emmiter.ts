import { GuildModel } from '../databases/mongo/models/guild';
import crypto from 'crypto';
import RssFeedEmitter from 'rss-feed-emitter';

export const feedHashAndChannels = new Map<string, Array<string>>();

export const syncFeedLinks = async () => {
  const guilds = await GuildModel.find().populate('channel').populate('feeds');
  const feeder = new RssFeedEmitter();

  for (const guild of guilds) {
    for (const feed of guild.feeds) {
      const hash = crypto.createHash('md5').update(feed.link).digest('hex');

      if (!feedHashAndChannels.has(hash)) {
        feedHashAndChannels.set(hash, []);
      }

      feedHashAndChannels.get(hash)?.push(guild.channel.channelId);

      feeder.add({ url: feed.link, refresh: getMsSixPm(), eventName: hash });
    }
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
