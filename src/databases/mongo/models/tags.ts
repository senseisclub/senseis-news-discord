import { Schema, model } from 'mongoose';
import { Guild } from './guild';

export interface Tag {
  tag: string;
  guild: Guild;
}

const tagSchema = new Schema<Tag>({
  tag: { type: String, required: true },
  guild: { type: Schema.Types.ObjectId, ref: 'Guilds', required: true },
});

export const TagModel = model<Tag>('Tags', tagSchema, 'tags');
