import { Schema, model } from 'mongoose';

interface Feed {
  link: string;
}

const feedSchema = new Schema<Feed>({
  link: { type: String, required: true },
});

export const FeedModel = model<Feed>('Feeds', feedSchema, 'feeds');
