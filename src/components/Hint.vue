<template>
  <div class="pwc-hint">
    <div v-if="isOpen" class="pwc-hint__tooltip">
      <div class="pwc-hint__tooltip-close" @click="close">
        <svg viewBox="0 0 10 10"><path d="M.47 8.47a.75.75 0 001.06 1.06L5 6.06l3.47 3.47a.75.75 0 001.06-1.06L6.06 5l3.47-3.47A.75.75 0 008.47.47L5 3.94 1.53.47A.75.75 0 10.47 1.53L3.94 5 .47 8.47z"/></svg>
      </div>
      <div class="pwc-hint__tooltip-text" v-html="hint"></div>
      <div class="pwc-hint__tooltip-arrow"></div>
    </div>
    <div class="pwc-hint__button pwc-hint__button--main" @click="open">
      <div>Подсказка</div>
    </div>
    <div v-if="hintCount < 1" class="pwc-hint__button pwc-hint__button--back">
      <div>Подсказка</div>
    </div>
    <div class="pwc-hint__text">За использование подсказок<br>снижаем итоговый рейтинг.</div>
  </div>
</template>

<script>
import client from 'api-client';
import { mapGetters } from 'vuex';
import * as Analytics from '../lib/analytics';

export default {
  name: 'Hint',
  data() {
    return {
      isOpen: false,
      text: '',
    };
  },
  computed: {
    ...mapGetters([
      'hintCount',
    ]),
    hint() {
      return `Подсказка №${this.hintCount}: ${this.text}`;
    },
  },
  methods: {
    open() {
      if (this.isOpen) {
        this.close();

        return;
      }

      Analytics.sendEvent(`Hint open (${this.hintCount + 1})`);

      client
        .getHint()
        .then((resp) => {
          if (resp.rc === 200) {
            this.text = resp.data.text;
          } else {
            console.log(resp);
          }
        });

      this.$store.commit('setHintCount');

      this.isOpen = true;
    },
    close() {
      Analytics.sendEvent(`Hint close (${this.hintCount})`);

      this.isOpen = false;

      if (this.hintCount > 1) {
        this.$emit('wasted');
      }
    },
  },
};
</script>

<style lang="stylus">
  .pwc-hint
    position: relative

    &__tooltip
      position: absolute
      z-index: 1
      bottom: calc(100% + 25px)
      left: 50%
      width: calc(100% + 60px)
      padding: 10px
      font-size: 14px
      color: #FFB600
      background-color: #0E0E0E
      border-radius: 4px
      border: 1px solid #775B13
      transform: translate3d(-50%, 0, 0)

      @media (min-width: 568px)
        width: 375px
        padding: 18px 22px
        font-size: 16px

    &__tooltip-text
      line-height: 1.4em

    &__tooltip-arrow
      position: absolute
      bottom: -11px
      left: 0
      right: 0
      width: 20px
      height: 20px
      margin: 0 auto
      background-color: #0E0E0E
      border-radius: 0 0 4px 0
      border-bottom: 1px solid #775B13
      border-right: 1px solid #775B13
      transform: rotate(45deg)

    &__tooltip-close
      position: absolute
      top: 3px
      right: 3px
      width: 10px
      height: 10px
      color: #FFB600
      opacity: .5
      cursor: pointer

      @media (min-width: 568px)
        top: 7px
        right: 7px

      &:hover
        opacity: 1

    &__text
      position: absolute
      top: calc(100% + 25px)
      left: 0
      font-size: 10px
      line-height: 1.4em
      white-space: nowrap
      color: #7D7D7D

      @media (min-width: 480px)
        top: 6px
        left: calc(100% + 30px)

      @media (min-width: 568px)
        font-size: 14px

    &__button
      position: relative

      & > div
        position: relative
        z-index: 1
        display: flex
        justify-content: center
        align-items: center
        min-width: 140px
        height: 40px
        padding: 0 15px
        color: #FFB600
        background-color: #0E0E0E
        border-radius: 4px
        border: 1px solid #775B13
        user-select: none
        cursor: pointer

        @media (min-width: 640px)
          height: 50px
          font-size: 18px

      &::before
        content: ''
        position: absolute
        z-index: -1
        bottom: 20%
        left: 0
        right: 0
        display: block
        width: 80%
        height: 30%
        margin: 0 auto
        background: #FFB600
        border-radius: 20px
        box-shadow: 0 0 25px #FFB600

      &--main
        z-index: 2

      &--back
        position: absolute
        z-index: 1
        bottom: -10px
        right: -10px
</style>
