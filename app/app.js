/* eslint-disable import/extensions */
const Slimbot = require('slimbot');
const Config = require('../config');
const Database = require('./databaseController');

const slimbot = new Slimbot(Config.token);

const commands = ['/add', '/show', '/start'];

async function addNewEvent(id, event) {
  const schedule = await Database.findUserSchedule(id);
  if (schedule == null) {
    Database.addNewSchedule(id, event);
  } else {
    Database.addEvent(id, event);
  }
}

slimbot.on('message', async (message) => {
  if (commands.includes(message.text)) {
    if (message.entities && message.entities[0] && message.entities[0].type && message.entities[0].type === 'bot_command') {
      if (message.text === '/add') {
        await addNewEvent(message.chat.id, { id: `test_id-${Math.random()}`, time: `at-${Math.random()}` });
      }
    }
  } else {
    slimbot.sendMessage(message.chat.id, 'Please use commands. To see commands type /help');
  }
});

slimbot.startPolling();
