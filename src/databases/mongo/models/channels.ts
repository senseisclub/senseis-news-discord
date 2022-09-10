import { Schema, model } from 'mongoose';
import { Guild } from './guild';

export interface Channel {
  channelId: string;
  name: string;
  guild: Guild;
}

const channelSchema = new Schema<Channel>({
  channelId: { type: String, required: true },
  name: { type: String, required: true },
  guild: { type: Schema.Types.ObjectId, ref: 'Guilds', required: true },
});

export const ChannelModel = model<Channel>('Channels', channelSchema, 'channels');
