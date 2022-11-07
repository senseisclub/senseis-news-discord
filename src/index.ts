import client from './bot';
import config from './config';
import connection from './databases/mongo/connection';
import { syncNewCommands } from './scripts/deploy-commands';
import { scheduleMessageSending } from './scripts/feed-emmiter';
import { onReady, onCommand, onSelectMenu, onClientRemoved, onClientCreated } from './handlers';

syncNewCommands();
connection();

scheduleMessageSending(client);

onReady(client);
onClientCreated(client);
onClientRemoved(client);
onCommand(client);
onSelectMenu(client);

client.login(config.TOKEN);
