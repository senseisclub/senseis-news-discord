import { REST, Routes } from 'discord.js';
import config from '../config';
import { commandModules } from '../commands';
import { BotCommand } from '../commands/types/BotCommand';

export const syncNewCommands = async () => {
  const commands = [];

  for (const module of Object.values<BotCommand>(commandModules)) {
    commands.push(module.data);
  }

  const rest = new REST().setToken(config.TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(config.APPLICATION_ID, config.GUILD_ID), { body: commands });

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
};
