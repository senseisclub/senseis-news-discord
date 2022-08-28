import { ChatInputCommandInteraction, InteractionResponse, SlashCommandSubcommandBuilder } from 'discord.js';

export interface BotSubcommand {
  data: SlashCommandSubcommandBuilder;
  execute(interaction: ChatInputCommandInteraction, guildId: string): Promise<InteractionResponse<boolean> | undefined>;
}
