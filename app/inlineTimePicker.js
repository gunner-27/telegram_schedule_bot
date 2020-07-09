function prepareOptionalParams() {
  const optionalParams = {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: [[
        { text: '-', callback_data: 'dec hour' },
        { text: '-', callback_data: 'dec minutes' },
      ], [
        { text: '12', callback_data: '12 hours' },
        { text: '00', callback_data: '00 minutes' },
      ], [
        { text: '+', callback_data: 'inc hour' },
        { text: '+', callback_data: 'inc minutes' },
      ],
      ],
    }),
  };
  return optionalParams;
}

module.exports = { prepareOptionalParams };
