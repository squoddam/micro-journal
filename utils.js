export const log = v => (console.log(v), v);

export const withLeadingZero = num =>
  String(num).length > 1 ? num : `0${num}`;

export const getDate = date => {
  const d = new Date(date);

  return `${withLeadingZero(d.getDate())}/${withLeadingZero(d.getMonth() + 1)}`;
};

export const getTime = date => {
  const d = new Date(date);

  return `${withLeadingZero(d.getHours())}:${withLeadingZero(d.getMinutes())}`;
};

const dateDetailsGetters = [
  {
    name: 'hours',
    getter: d => d.getHours()
  },
  {
    name: 'minutes',
    getter: d => d.getMinutes()
  },
  {
    name: 'year',
    getter: d => d.getFullYear()
  },
  {
    name: 'month',
    getter: d => d.getMonth() + 1
  },
  {
    name: 'day',
    getter: d => d.getDate()
  },
  {
    name: 'time',
    getter: d => d.getTime()
  }
];

export const getDateDetails = (date = Date.now()) => {
  const d = new Date(date);

  const detailsObj = dateDetailsGetters.reduce((details, { name, getter }) => {
    details[name] = getter(d);
    return details;
  }, {});

  return {
    formattedDay: `${detailsObj.year}/${detailsObj.month}/${detailsObj.day}`,
    ...detailsObj
  };
};

export const compareDateDesc = (a, b) =>
  new Date(b).getTime() - new Date(a).getTime();
