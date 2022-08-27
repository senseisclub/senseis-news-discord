import { InteractionResponse, SelectMenuInteraction } from 'discord.js';

export interface BotSelectMenu {
  customId: string;
  execute(interaction: SelectMenuInteraction): Promise<InteractionResponse<boolean> | undefined>;
}
