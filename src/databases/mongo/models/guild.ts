import { Schema, model } from 'mongoose';
import { Channel } from './channels';
import { Feed } from './feeds';
import { Tag } from './tags';

export interface Guild {
  guildId: string;
  guildName: string;
  channel: Channel;
  feeds: Feed[];
  tags: Tag[];
}

const feedSchema = new Schema<Guild>({
  guildId: { type: String, required: true },
  guildName: { type: String, required: true },
  channel: { guild: { type: Schema.Types.ObjectId, ref: 'Channels' } },
  feeds: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
});

export const GuildModel = model<Guild>('Guilds', feedSchema, 'guilds');
