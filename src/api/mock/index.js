const fetch = (mockData, rc = 200, time = 0) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      data: mockData,
      rc,
      rm: '',
    });
  }, time);
});

export default {
  getData() {
    return fetch({}, 200, 500);
  },
  start() {
    return fetch({ isResolved: false, seconds: 0, isFilled: false }, 200, 500);
  },
  getHint() {
    return fetch({ text: 'Вспомни все' }, 200, 500);
  },
  check({ a1, a2 }) {
    const isResolved = a1 === '1' && a2 === '2';

    return fetch({ isResolved, percent: isResolved ? 11 : 0 }, 200, 500);
  },
  profile() {
    return fetch({}, 200, 500);
  },
};
