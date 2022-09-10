import client from './bot';
import config from './config';
import connection from './databases/mongo/connection';
import { syncNewCommands } from './scripts/deploy-commands';
import { onReady, onCommand } from './handlers';
import { onSelectMenu } from './handlers/on-select-menu';
import { syncFeedLinks } from './scripts/feed-emmiter';

syncNewCommands();
connection();
syncFeedLinks();

onReady(client);
onCommand(client);
onSelectMenu(client);

client.login(config.TOKEN);
