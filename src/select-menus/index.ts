import { SelectMenuIndex } from './types/CommandIndex';
import delFeed from './feeds/del';
import delTag from './tags/del';

const selectMenuModules: SelectMenuIndex = {};
selectMenuModules[delFeed.customId] = delFeed;
selectMenuModules[delTag.customId] = delTag;

export default selectMenuModules;
