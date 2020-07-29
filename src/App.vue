<template>
  <div
      class="pwc"
      v-observe-visibility="{
        callback: visibilityChanged,
        once: true,
      }"
  >
    <div
        v-for="index in 2"
        :key="index"
        :class="[
          'pwc__frame',
          `pwc__frame--${index}`,
          `pwc__frame--${component}`
        ]"
    ></div>
    <div class="pwc__container">
      <component :is="component" @start="currentComponent = 'Main'"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Start from './components/Start.vue';
import Main from './components/Main.vue';
import * as Analytics from './lib/analytics';

export default {
  name: 'App',
  components: {
    Start,
    Main,
  },
  data() {
    return {
      currentComponent: 'Start',
    };
  },
  computed: {
    ...mapGetters([
      'isResolved',
      'seconds',
    ]),
    component() {
      return this.isResolved || this.seconds > 0 ? 'Main' : this.currentComponent;
    },
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) {
        Analytics.sendEvent('Project', 'Show');
      }
    },
  },
};
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap')

  .pwc
    position: relative
    z-index: 99
    max-width: 100%
    font-family: 'Roboto', sans-serif
    font-size: 16px
    line-height: normal
    text-size-adjust: 100%
    color: #ECECEC
    background-color: #0E0E0E

    @media (min-width: 680px)
      padding: 40px

    & *
    & *:before
    & *:after
      box-sizing: border-box

    & svg
      display block
      fill currentColor
      pointer-events none

    & b
      font-weight: 700

    &__frame
      position: absolute
      border: 1px solid rgba(#fff, .6)

      @media (max-width: 679px)
        display: none

      &--1
        top: 20px
        bottom: 10px
        left: 10px
        right: 20px
        border-color: #246275

        @media (min-width: 720px) and (max-width: 839px), (min-width: 1024px)
          top: 40px
          bottom: 30px
          left: 30px
          right: 40px

      &--2
        top: 10px
        bottom: 20px
        left: 20px
        right: 10px
        border-color: #671616

        @media (min-width: 720px) and (max-width: 839px), (min-width: 1024px)
          top: 30px
          bottom: 40px
          left: 40px
          right: 30px

      &--Main

        &::before
          content: ''
          position: absolute
          top: 0
          bottom: 0
          right: 20%
          width: 1px
          height: 100%

          @media (min-width: 840px) and (max-width: 1023px)
            content: none

      &--1&--Main

        &::before
          background-color: #246275

      &--2&--Main

        &::before
          background-color: #671616

    &__container
      position: relative
      z-index: 1

    &-button
      position: relative
      display: inline-flex
      justify-content: center
      align-items: center
      height: 40px
      margin: 0
      padding: 0 15px
      font-family: inherit
      font-size: 16px
      font-weight: 400
      color: #000
      background-color: #FFB600
      background-image: linear-gradient(0deg, #ffb600 25%, #e5a400 25%, #e5a400 50%, #ffb600 50%, #ffb600 75%, #e5a400 75%, #e5a400 100%)
      background-size: 4px 4px
      border-radius: 4px
      border: 0
      outline: none
      box-shadow: none
      appearance: none
      user-select: none
      cursor: pointer

      @media (min-width: 640px)
        height: 50px
        padding: 0 25px
        font-size: 18px

      &::before
      &::after
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
        box-shadow: 0 0 35px #FFB600

      &:hover
        background-color: #FFC702
        background-image: linear-gradient(0deg, #ffc702 25%, #e0ac02 25%, #e0ac02 50%, #ffc702 50%, #ffc702 75%, #e0ac02 75%, #e0ac02 100%)

        &::after
          content: none

      &:disabled
        background-color: #7D7D7D
        background-image: linear-gradient(0deg, #7D7D7D 25%, #717171 25%, #717171 50%, #7D7D7D 50%, #7D7D7D 75%, #717171 75%, #717171 100%)
        cursor: default

        &::before
          box-shadow: 0 0 35px #717171

        &::after
          content: none

    &-terminal
      position: relative
      font-family: 'Roboto Mono', monospace
      font-weight: 300
      text-shadow: -1px 0 0 #0075FF
      color: #E0301E
      user-select: none

      &::after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        width: 100%
        height: 100%
        background-color: transparent
        background-image: linear-gradient(0deg, transparent 25%, rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, 0.25) 50%, transparent 50%, transparent 75%, rgba(0, 0, 0, 0.25) 75%, rgba(0, 0, 0, 0.25) 100%)
        background-size: 4px 4px

      & > span
        padding: 0 2px
        font-weight: 400
        text-shadow: none
        color: #2E2424
        background-color: #B03771
</style>
