import { Schema, model } from 'mongoose';

interface Channel {
  channelId: string;
  guildId: string;
  name: string;
}

const channelSchema = new Schema<Channel>({
  channelId: { type: String, required: true },
  guildId: { type: String, required: true },
  name: { type: String, required: true },
});

export const ChannelModel = model<Channel>('Channels', channelSchema, 'channels');
