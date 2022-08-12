import { ChatInputCommandInteraction, Client, InteractionResponse, SlashCommandSubcommandBuilder } from 'discord.js';

export interface BotSubcommand {
  data: SlashCommandSubcommandBuilder;
  execute(interaction: ChatInputCommandInteraction, client?: Client): Promise<InteractionResponse<boolean> | undefined>;
}
