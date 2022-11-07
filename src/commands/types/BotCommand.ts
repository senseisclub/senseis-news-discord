import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

export interface BotCommand {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<boolean> | undefined>;
}
