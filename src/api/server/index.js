import axios from 'axios';

export default {
  getData() {
    return axios
      .post('/special/pwc-ai/data', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  start() {
    return axios
      .post('/special/pwc-ai/start', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  getHint() {
    return axios
      .post('/special/pwc-ai/hint', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  check({ a1, a2 }) {
    const fd = new FormData();

    fd.append('a1', a1);
    fd.append('a2', a2);

    return axios
      .post('/special/pwc-ai/check', fd, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  profile(data) {
    return axios
      .post('/special/pwc-ai/profile', data, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
};
