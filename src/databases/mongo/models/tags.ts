import { Schema, model } from 'mongoose';

interface Tag {
  tag: string;
}

const tagSchema = new Schema<Tag>({
  tag: { type: String, required: true },
});

export const TagModel = model<Tag>('Tags', tagSchema, 'tags');