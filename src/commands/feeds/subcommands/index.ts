import { SubcommandIndex } from '../../types/SubcommandIndex';
import add from './add';
import list from './list';
import del from './del';
import channel from './channel';

export const subcommanFeeddModules: SubcommandIndex = {
  add,
  list,
  del,
  channel,
};
