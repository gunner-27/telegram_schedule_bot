const Slimbot = require('slimbot');
const Config = require('../config');
const Database = require('./databaseController');
const DatePicker = require('./inlineDatePicker');
const TimePicker = require('./inlineTimePicker');

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

function decMonth(date) {
  const month = date.getMonth();
  const newMonth = month === 0 ? 11 : month - 1;
  const newYear = month === 11 ? date.getFullYear() - 1 : date.getFullYear();
  const newDate = new Date(new Date(date.setFullYear(newYear)).setMonth(newMonth));
  return newDate;
}

function incMonth(date) {
  const month = date.getMonth();
  const newMonth = month === 11 ? 0 : month + 1;
  const newYear = month === 11 ? date.getFullYear() + 1 : date.getFullYear();
  const newDate = new Date(new Date(date.setFullYear(newYear)).setMonth(newMonth));
  return newDate;
}

async function addEvent(message) {
  let date = new Date();
  await slimbot.sendMessage(message.chat.id, 'Выберите дату', DatePicker.prepareOptionalParams(date));
  slimbot.on('callback_query', async (query) => {
    if (query.data === 'prev') {
      date = decMonth(date);
      await slimbot.editMessageReplyMarkup(query.message.chat.id, query.message.message_id, DatePicker.prepareOptionalParams(date).reply_markup);
    }
    if (query.data === 'next') {
      date = incMonth(date);
      await slimbot.editMessageReplyMarkup(query.message.chat.id, query.message.message_id, DatePicker.prepareOptionalParams(date).reply_markup);
    }
    const dateRegExp = new RegExp(/^\d{1,2}$/gm);
    if (query.data.match(dateRegExp)) {
      await slimbot.editMessageReplyMarkup(query.message.chat.id, query.message.message_id, '');
      await slimbot.sendMessage(query.message.chat.id, `${query.data} число. Напишите время чч:мм`);
      slimbot.on('message', async (msg) => {
        await addNewEvent(message.chat.id, { id: `${query.message.chat.id}-${query.message.message_id}`, time: `at-${msg.text}` });
        await slimbot.sendMessage(message.chat.id, `Событие добавлено на ${date} в ${msg.text}`);
      });
    }
  });
}

slimbot.on('message', async (message) => {
//  await slimbot.sendMessage(message.chat.id, 'Выберите время', TimePicker.prepareOptionalParams());
  if (commands.includes(message.text)) {
    if (message.entities && message.entities[0] && message.entities[0].type && message.entities[0].type === 'bot_command') {
      if (message.text === '/add') {
        await addEvent(message);
      }
    }
  } else {
    slimbot.sendMessage(message.chat.id, 'Please use commands. To see commands type /help');
  }
});

slimbot.startPolling();
