<template>
  <div class="pwc-main">
    <div
        v-if="popup.isOpen"
        :class="{
          'pwc-main-popup': true,
          'pwc-main-popup--correct': popup.isCorrect,
          'pwc-main-popup--incorrect': popup.isCorrect === false,
        }">
      <div class="pwc-main-popup__bg"></div>
      <div class="pwc-main-popup__container">
        <div class="pwc-main-popup__icon">
          <svg viewBox="0 0 40 33"><path d="M36.399 33H3.644L0 29.437 17.535 0h4.93L40 29.437 36.399 33zM4.33 31.303h31.34l2.186-2.163L21.48 1.697h-3.001L2.144 29.14l2.186 2.163z"/><path d="M20.879 10.095h-1.715v12.81h1.715v-12.81zM20.879 24.177h-1.715v1.612h1.715v-1.612z"/></svg>
        </div>
        <div class="pwc-main-popup__text">{{ popup.text }}</div>
      </div>
    </div>
    <div class="pwc-main__timer">
      <div class="pwc-terminal">{{ time }}</div>
    </div>
    <div class="l-island-a">
      <div class="pwc-main__container">
        <div class="pwc-main__text" v-html="text[0]"></div>
        <div class="pwc-main__output">
          <Table />
        </div>
        <div class="pwc-main__questions">
          <div class="pwc-main__question">
            <div class="pwc-question">
              <div class="pwc-question__text">Введите код</div>
              <div
                  :class="{
                  'pwc-question__field': true,
                  'pwc-question__field--disabled': isResolved,
                  'pwc-question__field--textarea': true
                }">
                <textarea placeholder="Введите ответ" :disabled="isResolved" rows="4" cols="4"></textarea>
              </div>
            </div>
          </div>
          <div class="pwc-main__question">
            <div class="pwc-question">
              <div class="pwc-question__text">Введите последовательность вида X1-X2-X3-X4-X5</div>
              <div
                  :class="{
                  'pwc-question__field': true,
                  'pwc-question__field--disabled': isResolved
                }">
                <input v-model="a1" type="text" placeholder="Введите ответ" :disabled="isResolved">
              </div>
            </div>
          </div>
          <div class="pwc-main__question">
            <div class="pwc-question">
              <div class="pwc-question__text">
                Напишите получившееся числовое значение
              </div>
              <div
                  :class="{
                  'pwc-question__field': true,
                  'pwc-question__field--disabled': isResolved,
                }">
                <input v-model="a2" type="text" placeholder="Введите только число" :disabled="isResolved">
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isResolved" class="pwc-main__buttons">
          <div class="pwc-main__button">
            <div class="pwc-button" @click="check">Проверить</div>
          </div>
          <div v-if="!hintIsWasted" class="pwc-main__button">
            <Hint @wasted="hintIsWasted = true" />
          </div>
        </div>
        <div v-if="isResolved || (!isChecking && !popup.isOpen && checkCount > 2)" class="pwc-main__success" ref="success">
          <Success />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from 'api-client';
import { mapGetters } from 'vuex';
import Hint from './Hint.vue';
import Success from './Success.vue';
import Table from './Table.vue';
import * as Analytics from '../lib/analytics';


export default {
  name: 'Main',
  components: {
    Hint,
    Success,
    Table,
  },
  data() {
    return {
      text: [
        'Найдите самый короткий промежуток между X1 и X5 и занесите его числовое значение в протокол.',
      ],
      hintIsWasted: false,
      isChecking: false,
      intervalId: null,
      popup: {
        isOpen: false,
        text: '',
        isCorrect: false,
      },
    };
  },

  computed: {
    ...mapGetters([
      'isResolved',
      'seconds',
      'checkCount',
    ]),
    time() {
      const hours = Math.floor(this.seconds / 3600);
      const minutes = Math.floor((this.seconds - hours * 3600) / 60);
      const seconds = this.seconds - (hours * 3600) - (minutes * 60);

      return `${Number(hours).toString().padStart(2, '0')}:${Number(minutes).toString().padStart(2, '0')}:${Number(seconds).toString().padStart(2, '0')}`;
    },
    a1: {
      get() {
        return this.$store.state.a1;
      },
      set(value) {
        this.$store.commit('setA1', value);
      },
    },
    a2: {
      get() {
        return this.$store.state.a2;
      },
      set(value) {
        this.$store.commit('setA2', value);
      },
    },
  },
  mounted() {
    if (!this.isResolved) {
      this.start();
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    start() {
      this.intervalId = setInterval(() => {
        this.$store.commit('tick');
      }, 1000);
    },
    check() {
      if (this.isChecking) {
        return;
      }

      this.$store.commit('setCheckCount');

      Analytics.sendEvent('Check');

      this.isChecking = true;

      client
        .check({ a1: this.a1, a2: this.a2 })
        .then((resp) => {
          this.isChecking = false;

          if (resp.rc === 200 && resp.data.isResolved) {
            this.openMessagePopup(true);

            clearInterval(this.intervalId);

            setTimeout(() => {
              this.closeMessagePopup();

              this.$store.commit('setResolved', {
                isResolved: resp.data.isResolved,
                percent: resp.data.percent || 0,
              });

              this.$nextTick(() => {
                this.$scrollTo(this.$refs.success);
              });
            }, 3000);
          } else {
            this.openMessagePopup();

            setTimeout(() => {
              this.closeMessagePopup();
            }, 3000);
          }
        });
    },
    openMessagePopup(isCorrect = false) {
      this.popup.text = isCorrect ? 'Верно' : 'Неверно';
      this.popup.isCorrect = isCorrect;
      this.popup.isOpen = true;
    },
    closeMessagePopup() {
      this.popup.isOpen = false;
    },
  },
};
</script>

<style lang="stylus">
  .pwc-main
    padding: 20px 0 70px

    @media (min-width: 720px)
      padding: 70px 0

    &__timer
      padding-top: 25px
      padding-bottom: 25px
      padding-left: 15px
      font-size: 20px

      @media (min-width: 640px)
        width: 600px
        margin: 0 auto
        padding-left: 0

      @media (min-width: 680px)
        position: sticky
        top: 60px
        left: 100%
        width: calc(20% + 10px)
        height: 0
        margin: 0 -20px 0 0
        padding: 0
        text-align: center

      @media (min-width: 720px)
        top: 110px
        width: 20%
        margin: 0

      @media (min-width: 840px) and (max-width: 1023px)
        margin: 0 -20px 0 0

      @media (min-width: 1024px)
        font-size: 25px

    &__container

      @media (min-width: 680px)
        padding-right: calc(20% + 10px)

      @media (min-width: 900px)
        padding-right: 15%

    &__text
      line-height: 1.6em

      @media (min-width: 640px)
        font-size: 18px

      & p:not(:last-child)
      &:not(:last-child)
        margin-bottom: 2.22em

    &__output
      margin: 2em 0
      font-size: 18px
      line-height: 1.4em

      @media (min-width: 640px)
        font-size: 24px

    &__questions
      margin-bottom: 45px

    &__question

      &:not(:last-child)
        margin-bottom: 40px

    &__buttons
      display: flex
      align-items: flex-start

    &__button

      &:not(:last-child)
        margin-right: 20px

        @media (min-width: 375px)
          margin-right: 30px

    &__success
      margin-top: 55px

  .pwc-question

    &__text
      margin-bottom: 1em
      font-size: 18px
      font-weight: 500
      line-height: 1.6em

      @media (min-width: 680px)
        margin-bottom: 1.4em

    &__notice
      margin-top: .6em
      color: #7d7d7d

      @media (max-width: 679px)
        font-size: 14px

    &__field
      position: relative
      width: 340px
      max-width: 100%

      &--textarea
        width 510px

      &::before
        content: ''
        position: absolute
        bottom: 0
        left: 0
        right: 0
        display: block
        width: 100%
        height: 5px
        border-radius: 100%
        box-shadow: 0 0 25px 4px #A92929

      &--disabled::before
        box-shadow: 0 0 25px #A8A4A4
      & > input, & > textarea
        position: relative
        z-index: 1
        width: 100%
        height: 40px
        margin: 0
        padding: 0 15px
        font-family: inherit
        font-size: 16px
        font-weight: 400
        color: #fff
        background-color: #A43648
        background-image: linear-gradient(0deg, #A43648 25%, #8B2E3D 25%, #8B2E3D 50%, #A43648 50%, #A43648 75%, #8B2E3D 75%, #8B2E3D 100%)
        background-size: 4px 4px
        border-radius: 5px
        border: 0
        box-shadow: inset 0 2px 0 #6B1C2A
        outline: none
        appearance: none

        @media (min-width: 640px)
          height: 50px

        &:focus
          background-color: #DB536A
          background-image: linear-gradient(0deg, #BA475A 25%, #DB536A 25%, #DB536A 50%, #BA475A 50%, #BA475A 75%, #DB536A 75%, #DB536A 100%)

        &::placeholder
          color: #C56676
        &:focus::placeholder
          color: transparent;

        &:disabled
          color: #818181
          background-color: #504E4E
          background-image: linear-gradient(0deg, #504E4E 25%, #484646 25%, #484646 50%, #504E4E 50%, #504E4E 75%, #484646 75%, #484646 100%)
          box-shadow: inset 0 2px 0 #333031

          &::placeholder
            color: #818181
      & > textarea
        height: 160px
        padding: 15px
        resize: none
  .pwc-main-popup
    position: fixed
    z-index: 10
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: flex
    justify-content: center
    align-items: center

    @media (min-width: 840px)
      position: absolute
      align-items: flex-end
      padding-bottom: 100px

    &__bg
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      width: 100%
      height: 100%
      background-color: rgba(#000, .6)

    &__container
      position: relative
      z-index: 1
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 300px
      max-width: 100%
      height: 116px
      background-color: #57C26E
      background-image: linear-gradient(0deg, #57C26E 25%, #4DAC62 25%, #4DAC62 50%, #57C26E 50%, #57C26E 75%, #4DAC62 75%, #4DAC62 100%)
      background-size: 4px 4px
      border-radius: 5px
      border-left: 1px solid #435DC5
      border-right: 2px solid #5D223E
      box-shadow: 0 0 50px rgba(#57C26E, .35)

      &::after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        width: 95%
        height: 85%
        margin: auto
        border-radius: 4px
        border: 2px solid #57C26E

      ^[0]--incorrect &
        background-color: #E0301E
        background-image: linear-gradient(0deg, #E0301E 25%, #A82416 25%, #A82416 50%, #E0301E 50%, #E0301E 75%, #A82416 75%, #A82416 100%)
        border-right-color: #256E27
        box-shadow: 0 0 50px rgba(#E0301E, .35)

        &::after
          border-color: #E0301E

    &__icon
      width: 40px
      height: 33px
      color: #fff

    &__text
      margin-top: 10px
      font-family: 'Roboto Mono', monospace
      font-size: 20px
      font-weight: 300
      color: #fff
</style>
