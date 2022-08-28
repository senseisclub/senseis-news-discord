import { ChatInputCommandInteraction, italic, SlashCommandSubcommandBuilder } from 'discord.js';
import { TagModel } from '../../../databases/mongo/models/tags';
import { BotSubcommand } from '../../types/BotSubcommand';

class ListTag implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder().setName('list').setDescription('List all added tags');

  async execute(interaction: ChatInputCommandInteraction) {
    const tags = await TagModel.find().sort({ tag: 'asc' }).exec();

    if (tags.length == 0) {
      return interaction.reply({
        content: 'No tags registered!',
      });
    }

    let res = 'Registered tags:\n';
    for (let i = 0; i < tags.length; i++) {
      res += `${i + 1}. ${italic(tags[i].tag)}\n`;
    }

    return interaction.reply({
      content: res,
    });
  }
}

export default new ListTag();
