import dotenv from 'dotenv';

dotenv.config();

const { TOKEN, APPLICATION_ID, GUILD_ID, MONGO_CONNECTION } = process.env;

if (!TOKEN || !APPLICATION_ID || !GUILD_ID || !MONGO_CONNECTION) {
  throw new Error('Missing enviroment variables');
}

const config: Record<string, string> = {
  TOKEN,
  APPLICATION_ID,
  GUILD_ID,
  MONGO_CONNECTION,
};

export default config;
