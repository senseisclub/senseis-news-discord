import { Schema, model } from 'mongoose';

export interface Guild {
  guildId: string;
  guildName: string;
  channelId: string;
}

const feedSchema = new Schema<Guild>({
  guildId: { type: String, required: true },
  guildName: { type: String, required: true },
  channelId: { type: String },
});

export const GuildModel = model<Guild>('Guilds', feedSchema, 'guilds');
