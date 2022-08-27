import { SelectMenuIndex } from './types/CommandIndex';
import del from './feeds/del';

const selectMenuModules: SelectMenuIndex = {};
selectMenuModules[del.customId] = del;

export default selectMenuModules;
