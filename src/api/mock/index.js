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
    return fetch({ text: '<div><img src="https://leonardo.osnova.io/a8430621-f99b-9d6f-c992-d53690524b61/" /></div>' }, 200, 500);
  },
  check({ a1, a2 }) {
    const isResolved = a1 === '1' && a2 === '2';

    return fetch({ isResolved, percent: isResolved ? 11 : 0 }, 200, 500);
  },
  profile() {
    return fetch({}, 200, 500);
  },
};
