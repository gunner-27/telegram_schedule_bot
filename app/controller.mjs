import Slimbot from 'slimbot';
import Config from '../config.mjs';

const slimbot = new Slimbot(Config.token);

slimbot.on('message', (message) => {
  console.log(message);
});

slimbot.startPolling();
