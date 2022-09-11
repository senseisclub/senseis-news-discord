import client from './bot';
import config from './config';
import connection from './databases/mongo/connection';
import { syncNewCommands } from './scripts/deploy-commands';
import { syncFeedLinks } from './scripts/feed-emmiter';
import { onReady, onCommand, onSelectMenu, onClientRemoved, onClientCreated } from './handlers';

syncNewCommands();
connection();
syncFeedLinks();

onReady(client);
onClientCreated(client);
onClientRemoved(client);
onCommand(client);
onSelectMenu(client);

client.login(config.TOKEN);
