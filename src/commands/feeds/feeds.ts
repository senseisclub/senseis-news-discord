import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { GuildModel } from '../../databases/mongo/models/guild';
import { BotCommand } from '../types/BotCommand';
import { BotSubcommand } from '../types/BotSubcommand';
import { subcommanFeeddModules } from './subcommands';

class Feeds implements BotCommand {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('feeds')
      .setDescription('Manage RSS feed list')
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

    for (const subcommand of Object.values<BotSubcommand>(subcommanFeeddModules)) {
      this.data.addSubcommand(subcommand.data);
    }
  }

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction || !interaction.options) {
      return;
    }

    const guild = await GuildModel.findOne({ guildId: interaction.guildId });
    if (!guild) {
      return interaction.reply({
        content: ':warning: Sorry, guild not found!',
        ephemeral: true,
      });
    }

    const subcommand = interaction.options.getSubcommand();

    return subcommanFeeddModules[subcommand].execute(interaction, guild.id);
  }
}

export default new Feeds();
