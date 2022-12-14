import { bold, ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { BotSubcommand } from '../../types/BotSubcommand';
import { Utils } from '../../../utils/utils';
import { TagModel } from '../../../databases/mongo/models/tags';
import { ObjectId } from 'mongoose';

class AddTag implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder()
    .setName('add')
    .setDescription('Add a new tag')
    .addStringOption((option) => option.setName('tag').setDescription('Tag to filter news').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction, guildId: ObjectId) {
    const tag = Utils.trimAndLowerCase(interaction.options.getString('tag'));

    if (tag) {
      const duplicated = await TagModel.findOne({ tag, guild: guildId }).exec();

      if (duplicated) {
        return interaction.reply({
          content: ':warning: Sorry, duplicate tag!',
          ephemeral: true,
        });
      }

      await new TagModel({ tag, guild: guildId }).save();

      return interaction.reply({
        content: `${bold(tag)} has been added!`,
      });
    }

    return interaction.reply({
      content: 'Tag not found! ',
      ephemeral: true,
    });
  }
}

export default new AddTag();
