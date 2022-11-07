import { bold, Client, italic, TextChannel } from 'discord.js';
import FeedParser from '../commands/feeds/feed-parser/feed-parser';
import { FeedModel } from '../databases/mongo/models/feeds';
import { TagModel } from '../databases/mongo/models/tags';
import cron from 'node-cron';
import { Utils } from '../utils/utils';
import config from '../config';

export const scheduleMessageSending = async (client: Client) => {
  cron.schedule(config.CRON_REFRESH_RATE, async () => {
    console.log('Sending message to channels...');

    const links = await FeedModel.distinct('link').exec();
    for (const link of links) {
      const feeds = await FeedModel.find({ link }).populate('guild').exec();

      const parser = new FeedParser(link);
      const items = await parser.getItems();

      for (const feed of feeds) {
        if (feed.guild.channelId) {
          const tags = await TagModel.find({ guild: feed.guild }).exec();

          items.forEach(async (item) => {
            if (item.pubDate && new Date(item.pubDate).getTime() > feed.lastUpdate) {
              const hasFeedTag =
                !tags.length ||
                !item.categories ||
                !item.categories.length ||
                tags.some((tag) => item.categories?.some((categorie) => Utils.compareString(categorie, tag.tag)));

              if (hasFeedTag) {
                try {
                  const channel = (await client.channels.fetch(feed.guild.channelId)) as TextChannel;

                  await channel.send({
                    content: `\n${bold(item.title ? item.title : 'Untitled')}\n\n${item.link}\n\n ${italic(
                      'Tags: [' + (item.categories ? item.categories : '') + ']'
                    )}`,
                  });
                } catch (e) {
                  console.log('Could not send message...');
                  console.error(e);
                }
              }
            }
          });
        }

        await feed.update({ lastUpdate: new Date().getTime() }).exec();
      }
    }
  });
};
