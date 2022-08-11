import { Client, Events } from 'discord.js';

export const onReady = (client: Client) => {
  client.on(Events.ClientReady, () => {
    console.log(`${client.user?.username} is online`);
  });
};
