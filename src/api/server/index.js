import axios from 'axios';

export default {
  getData() {
    return axios
      .post('/special/pwc-ai-2/data', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  start() {
    return axios
      .post('/special/pwc-ai-2/start', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  getHint() {
    return axios
      .post('/special/pwc-ai-2/hint', {}, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  check({ a0, a1, a2 }) {
    const fd = new FormData();

    fd.append('a0', a0);
    fd.append('a1', a1);
    fd.append('a2', a2);

    return axios
      .post('/special/pwc-ai-2/check', fd, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
  profile(data) {
    return axios
      .post('/special/pwc-ai-2/profile', data, {
        headers: {
          'X-This-Is-CSRF': 'THIS IS SPARTA!',
        },
      })
      .then((response) => response.data);
  },
};
