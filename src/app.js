// import './css/app.styl';

import Vue from 'vue';
import VueObserveVisibility from 'vue-observe-visibility';
import VueScrollTo from 'vue-scrollto';
import client from 'api-client';
import store from './store';
import App from './App.vue';
import * as Analytics from './lib/analytics';

Vue.use(VueObserveVisibility);

Vue.use(VueScrollTo, {
  offset: -60,
});

Vue.config.productionTip = false;

client
  .getData()
  .then((resp) => {
    if (resp.rc === 200) {
      store.commit('setData', resp.data);
    }
  });

const IMAGES = [];

export default class Special {
  constructor(params = {}) {
    this.params = {};

    this.params = { ...this.params, ...params };

    if (this.params.css) {
      Special.loadStyles(this.params.css).then(() => this.init());
    } else {
      this.init();
    }
  }

  static loadStyles(path) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = path;

      link.onload = () => resolve();
      link.onerror = () => reject();

      document.body.appendChild(link);
    });
  }

  init() {
    Analytics.sendEvent('Project', 'Init');

    const images = [];

    images.forEach((image) => {
      const img = new Image();
      img.src = image.x1;

      if (image.x2) {
        img.srcset = `${image.x2} 2x`;
      }

      IMAGES.push(img);
    });

    new Vue({
      store,
      render: (h) => h(App),
      methods: {
        clickHandler(e) {
          let { target } = e;

          while (target.parentNode && target !== e.currentTarget) {
            if (target.tagName.toLowerCase() === 'a') {
              Analytics.sendEvent(`link: ${target.href}`);
            }

            target = target.parentNode;
          }
        },
      },
      mounted() {
        this.$el.addEventListener('click', this.clickHandler);
      },
      beforeDestroy() {
        this.$el.removeEventListener('click', this.clickHandler);
      },
    }).$mount(this.params.container);
  }
}
