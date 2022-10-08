import { ChatInputCommandInteraction, Client, InteractionResponse, SlashCommandSubcommandBuilder } from 'discord.js';
import { ObjectId } from 'mongoose';

export interface BotSubcommand {
  data: SlashCommandSubcommandBuilder;
  execute(
    interaction: ChatInputCommandInteraction,
    guildId: ObjectId,
    client?: Client
  ): Promise<InteractionResponse<boolean> | undefined>;
}
