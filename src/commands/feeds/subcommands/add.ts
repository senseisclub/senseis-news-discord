import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { FeedModel } from '../../../databases/mongo/models/feeds';
import { BotSubcommand } from '../../types/BotSubcommand';
import feedValidator from '../feed-validation/feed-validator';
import { Utils } from '../../../utils/utils';
import { ObjectId } from 'mongoose';

class AddFeed implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder()
    .setName('add')
    .setDescription('Add a new feed link')
    .addStringOption((option) => option.setName('link').setDescription('Link of feed').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction, guildId: ObjectId) {
    const link = Utils.trimAndLowerCase(interaction.options.getString('link'));

    try {
      await feedValidator.checkUrl(link);

      const duplicated = await FeedModel.findOne({ link, guildId }).exec();

      if (duplicated) {
        return interaction.reply({
          content: ':warning: Sorry, duplicate link!',
          ephemeral: true,
        });
      }

      const feed = new FeedModel({ link, guildId });

      await feed.save();

      return interaction.reply({
        content: `${link} has been added!`,
      });
    } catch (error) {
      return interaction.reply({
        content: ':warning: Sorry, invalid link!',
        ephemeral: true,
      });
    }
  }
}

export default new AddFeed();
