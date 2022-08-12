import { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { FeedModel } from '../../../databases/mongo/models/feeds';
import { BotSubcommand } from '../../types/BotSubcommand';
import feedValidator from '../feed-validation/feed-validator';

class AddFeed implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder()
    .setName('add')
    .setDescription('Add a new feed link')
    .addStringOption((option) => option.setName('link').setDescription('Link of feed').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction) {
    const link = interaction.options.getString('link');

    if (link) {
      try {
        await feedValidator.checkUrl(link);

        const feed = new FeedModel({ link });

        await feed.save();

        return interaction.reply({
          content: `${link} has been added!`,
        });
      } catch (error) {
        return interaction.reply({
          content: `:warning: Sorry, this link is invalid!`,
          ephemeral: true,
        });
      }
    }
  }
}

export default new AddFeed();
