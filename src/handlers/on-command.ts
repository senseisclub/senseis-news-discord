import { Client, Events } from 'discord.js';
import { commandModules } from '../commands';

export const onCommand = (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const { commandName } = interaction;

    try {
      await commandModules[commandName].execute(interaction, client);
    } catch (error) {
      await interaction.reply({
        content: 'Something went wrong while executing this command...',
        ephemeral: true,
      });

      console.error(error);
    }
  });
};
