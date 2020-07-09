const isLeapYear = (date) => (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0)
  || date.getFullYear() % 400 === 0;
const DaysInMonth = {
  R: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  L: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
};
const MonthsNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];
const getDaysInMonth = (date) => DaysInMonth[isLeapYear(date) ? 'L' : 'R'][date.getMonth()];

function prepareLastWeek(date) {
  const daysInThisMonth = getDaysInMonth(date);
  const LastWeek = [
    { text: '25', callback_data: '25' },
    { text: '26', callback_data: '26' },
    { text: '27', callback_data: '27' },
  ];
  for (let i = daysInThisMonth, k = 1; i - 27 > 0; i -= 1, k += 1) {
    LastWeek.push({ text: 27 + k, callback_data: 27 + k });
  }
  return LastWeek;
}

function prepareOptionalParams(date) {
  const lastWeek = prepareLastWeek(date);
  const optionalParams = {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: [[
        { text: '<', callback_data: 'prev' },
        { text: MonthsNames[date.getMonth()], callback_data: '-' },
        { text: '>', callback_data: 'next' },
      ], [
        { text: '1', callback_data: '1' },
        { text: '2', callback_data: '2' },
        { text: '3', callback_data: '3' },
        { text: '4', callback_data: '4' },
        { text: '5', callback_data: '5' },
        { text: '6', callback_data: '6' },
        { text: '7', callback_data: '7' },
        { text: '8', callback_data: '8' },
      ], [
        { text: '9', callback_data: '9' },
        { text: '10', callback_data: '10' },
        { text: '11', callback_data: '11' },
        { text: '12', callback_data: '12' },
        { text: '13', callback_data: '13' },
        { text: '14', callback_data: '14' },
        { text: '15', callback_data: '15' },
        { text: '16', callback_data: '16' },
      ],
      [
        { text: '17', callback_data: '17' },
        { text: '18', callback_data: '18' },
        { text: '19', callback_data: '19' },
        { text: '20', callback_data: '20' },
        { text: '21', callback_data: '21' },
        { text: '22', callback_data: '22' },
        { text: '23', callback_data: '23' },
        { text: '24', callback_data: '24' },
      ],
      lastWeek,
      ],
    }),
  };
  return optionalParams;
}

module.exports = { prepareOptionalParams };
