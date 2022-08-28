import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
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

    if (!interaction.guildId) {
      return interaction.reply({
        content: ':warning: Sorry, guild not found!',
        ephemeral: true,
      });
    }

    const subcommand = interaction.options.getSubcommand();

    return subcommanFeeddModules[subcommand].execute(interaction, interaction.guildId);
  }
}

export default new Feeds();
