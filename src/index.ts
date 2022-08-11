import client from './bot';
import config from './config';
import connection from './databases/mongo/connection';
import { syncNewCommands } from './scripts/deploy-commands';
import { onReady, onCommand } from './handlers';

syncNewCommands();
connection();

onReady(client);
onCommand(client);

client.login(config.TOKEN);
