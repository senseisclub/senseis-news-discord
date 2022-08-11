import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { BotCommand } from './types/BotCommand';
import { FeedModel } from '../databases/mongo/models/feeds';

class Feeds implements BotCommand {
  data = new SlashCommandBuilder()
    .setName('feeds')
    .setDescription('Manage RSS feed list')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName('add')
        .setDescription('Add a new feed link')
        .addStringOption((option) => option.setName('link').setDescription('Link of feed').setRequired(true))
    )
    .addSubcommand((subcommand) => subcommand.setName('list').setDescription('List all added feeds'));

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction || !interaction.options) {
      return;
    }

    if (interaction.options.getSubcommand() == 'add') {
      const link = interaction.options.getString('link');

      if (link) {
        const feed = new FeedModel({
          link,
        });

        await feed.save();

        return interaction.reply({
          content: `${link} has been added!`,
        });
      }
    } else if (interaction.options.getSubcommand() == 'list') {
      const feeds = await FeedModel.find();

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
}

export default new Feeds();
