<template>
  <div class="pwc-start">
    <img src="https://leonardo.osnova.io/a993d7fb-9778-b613-ab23-3d6b3474a4b1/" srcset="https://leonardo.osnova.io/d5fe958e-4f80-b117-3959-9a8df512d5a9/ 2x" alt="" class="pwc-start__img">
    <div class="l-island-a">
      <div class="pwc-start__container">
        <div class="pwc-start__text" v-html="text"></div>
        <div class="pwc-start__button">
          <div class="pwc-button" @click="start">Начать</div>
        </div>
      </div>
    </div>
  </div>
</template
>

<script>
import client from 'api-client';
import * as Analytics from '../lib/analytics';

export default {
  name: 'Start',
  data() {
    return {
      text: 'Приступайте к&nbsp;задаче, когда будете готовы — время, потраченное на&nbsp;решение, повлияет на&nbsp;рейтинг.',
    };
  },
  methods: {
    start() {
      Analytics.sendEvent('Start');

      client
        .start()
        .then((resp) => {
          if (resp.rc === 200) {
            this.$store.commit('setData', resp.data);
          }

          this.$nextTick(() => {
            this.$emit('start');
          });
        });
    },
  },
};
</script>

<style lang="stylus">
  .pwc-start
    position: relative
    min-height: 250px
    padding: 25px 0 70px

    &__img
      position: absolute
      display: block

      @media (max-width: 567px)
        bottom: 10px
        left: 150px
        width: 150px

      @media (min-width: 568px) and (max-width: 679px)
        bottom: 0
        right: 0
        width: 220px

      @media (min-width: 680px) and (max-width: 1023px)
        bottom: 10px
        right: 0
        width: 250px

      @media (min-width: 1024px)
        top: 5px
        right: 10px

    &__container
      position: relative
      z-index: 1

    &__text
      width: 400px
      max-width: 100%
      margin-bottom: 25px
      font-size: 18px
      line-height: 1.6em
</style>
