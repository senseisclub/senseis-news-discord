import { Schema, model } from 'mongoose';
import { Guild } from './guild';

export interface Feed {
  link: string;
  guild: Guild;
}

const feedSchema = new Schema<Feed>({
  link: { type: String, required: true },
  guild: { type: Schema.Types.ObjectId, ref: 'Guilds', required: true },
});

export const FeedModel = model<Feed>('Feeds', feedSchema, 'feeds');
