import { ChatInputCommandInteraction, InteractionResponse, SlashCommandSubcommandBuilder } from 'discord.js';
import { ObjectId } from 'mongoose';

export interface BotSubcommand {
  data: SlashCommandSubcommandBuilder;
  execute(
    interaction: ChatInputCommandInteraction,
    guildId: ObjectId
  ): Promise<InteractionResponse<boolean> | undefined>;
}
