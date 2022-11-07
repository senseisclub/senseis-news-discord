import dotenv from 'dotenv';

dotenv.config();

const { TOKEN, APPLICATION_ID, MONGO_CONNECTION, CRON_REFRESH_RATE } = process.env;

if (!TOKEN || !APPLICATION_ID || !MONGO_CONNECTION || !CRON_REFRESH_RATE) {
  throw new Error('Missing enviroment variables');
}

const config: Record<string, string> = {
  TOKEN,
  APPLICATION_ID,
  MONGO_CONNECTION,
  CRON_REFRESH_RATE,
};

export default config;
