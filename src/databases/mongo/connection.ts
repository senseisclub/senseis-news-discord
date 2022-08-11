import { connect } from 'mongoose';
import config from '../../config';

export default async () => {
  try {
    return await connect(config.MONGO_CONNECTION);
  } catch (error) {
    console.error(error);
  }
};
