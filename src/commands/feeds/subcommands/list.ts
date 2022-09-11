import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { ObjectId } from 'mongoose';
import { FeedModel } from '../../../databases/mongo/models/feeds';
import { BotSubcommand } from '../../types/BotSubcommand';

class ListFeed implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder().setName('list').setDescription('List all added feeds');

  async execute(interaction: ChatInputCommandInteraction, guildId: ObjectId) {
    const feeds = await FeedModel.find({ guild: guildId }).sort({ link: 'asc' }).exec();

    if (feeds.length == 0) {
      return interaction.reply({
        content: 'No feeds registered!',
      });
    }

    let res = 'Registered feeds:\n';
    for (let i = 0; i < feeds.length; i++) {
      res += `${i + 1}. ${feeds[i].link}\n`;
    }

    return interaction.reply({
      content: res,
    });
  }
}

export default new ListFeed();
