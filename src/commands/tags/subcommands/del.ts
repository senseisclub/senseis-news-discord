import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { BotSubcommand } from '../../types/BotSubcommand';
import delSelectMenu from '../../../select-menus/tags/del';
import { TagModel } from '../../../databases/mongo/models/tags';

class DelTag implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder().setName('del').setDescription('Delete a tag');

  async execute(interaction: ChatInputCommandInteraction, guildId: string) {
    const tags = await TagModel.find({ guildId }).sort({ link: 'asc' }).exec();

    if (tags.length == 0) {
      return interaction.reply({
        content: 'No tags registered!',
      });
    }

    const selectMenu = new SelectMenuBuilder().setCustomId(delSelectMenu.customId).setPlaceholder('Nothing selected');

    for (const tag of tags) {
      selectMenu.addOptions(new SelectMenuOptionBuilder().setLabel(tag.tag).setValue(tag.id));
    }

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(selectMenu);

    return interaction.reply({
      content: 'Select a tag to remove',
      components: [row],
    });
  }
}

export default new DelTag();
