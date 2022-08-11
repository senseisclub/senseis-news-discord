import {
  ChatInputCommandInteraction,
  Client,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

export interface BotCommand {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction, client?: Client): Promise<InteractionResponse<boolean> | undefined>;
}
