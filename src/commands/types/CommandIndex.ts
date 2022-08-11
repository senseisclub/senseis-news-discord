import { BotCommand } from './BotCommand';

export interface CommandIndex {
  [key: string]: BotCommand;
}
