import { Client, Events } from 'discord.js';
import selectMenuModules from '../select-menus';

export const onSelectMenu = (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isSelectMenu()) {
      return;
    }

    await selectMenuModules[interaction.customId].execute(interaction);
  });
};
