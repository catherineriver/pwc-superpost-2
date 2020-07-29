import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isResolved: false,
    seconds: 0,
    percent: 0,
    a1: '',
    a2: '',
    hintCount: 0,
    isFilled: false,
    checkCount: 0,
  },
  getters: {
    isResolved: (state) => state.isResolved,
    seconds: (state) => state.seconds,
    percent: (state) => state.percent,
    a1: (state) => state.a1,
    a2: (state) => state.a2,
    hintCount: (state) => state.hintCount,
    isFilled: (state) => state.isFilled,
    checkCount: (state) => state.checkCount,
  },
  mutations: {
    setData(state, {
      isResolved = false,
      seconds = 0,
      isFilled = false,
      a1 = '',
      a2 = '',
      percent = 0,
    }) {
      state.isResolved = isResolved;
      state.seconds = seconds;
      state.isFilled = isFilled;
      state.a1 = a1;
      state.a2 = a2;
      state.percent = percent;
    },
    tick(state) {
      state.seconds += 1;
    },
    setHintCount(state) {
      state.hintCount += 1;
    },
    setResolved(state, { isResolved = false, percent = 0 }) {
      state.isResolved = isResolved;
      state.percent = percent;
    },
    setFilled(state, isFilled) {
      state.isFilled = isFilled;
    },
    setCheckCount(state) {
      state.checkCount += 1;
    },
    setA1(state, value) {
      state.a1 = value;
    },
    setA2(state, value) {
      state.a2 = value;
    },
  },
  actions: {
  },
  modules: {},
});
