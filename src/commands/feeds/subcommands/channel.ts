import { channelMention, ChannelType, ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from 'discord.js';
import { ChannelModel } from '../../../databases/mongo/models/channels';
import { BotSubcommand } from '../../types/BotSubcommand';

class ChannelFeed implements BotSubcommand {
  data = new SlashCommandSubcommandBuilder()
    .setName('channel')
    .setDescription('Set channel to send news')
    .addChannelOption((option) => option.setName('channel').setDescription('Channel to send news').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction, guildId: string) {
    const channelSelected = interaction.options.getChannel('channel');

    if (!channelSelected) {
      return interaction.reply({
        content: ':warning: Sorry, select a channel!',
        ephemeral: true,
      });
    }

    if (channelSelected.type != ChannelType.GuildText) {
      return interaction.reply({
        content: ':warning: Sorry, only text channels are allowed!',
        ephemeral: true,
      });
    }

    const { id: channelId, name } = channelSelected;

    const channel = await ChannelModel.findOneAndUpdate(
      { guildId },
      { channelId, name },
      { returnOriginal: false, upsert: true }
    );

    if (channel) {
      return interaction.reply({
        content: `${channelMention(channel.channelId)} has been set to news!`,
      });
    }

    return interaction.reply({
      content: ':warning: Sorry, channel not saved!',
      ephemeral: true,
    });
  }
}

export default new ChannelFeed();