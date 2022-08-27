import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { FeedModel } from '../../../databases/mongo/models/feeds';
import { BotSubcommand } from '../../types/BotSubcommand';
import delSelectMenu from '../../../select-menus/feeds/del';

class DelFeed implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder().setName('del').setDescription('Delete a feed');

  async execute(interaction: ChatInputCommandInteraction) {
    const feeds = await FeedModel.find().sort({ link: 'asc' }).exec();

    if (feeds.length == 0) {
      return interaction.reply({
        content: 'No feeds registered!',
      });
    }

    const selectMenu = new SelectMenuBuilder().setCustomId(delSelectMenu.customId).setPlaceholder('Nothing selected');

    for (const feed of feeds) {
      selectMenu.addOptions(new SelectMenuOptionBuilder().setLabel(feed.link).setValue(feed.id));
    }

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(selectMenu);

    return interaction.reply({
      content: 'Select a feed to remove',
      components: [row],
    });
  }
}

export default new DelFeed();
