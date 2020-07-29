<template>
  <div class="pwc-success">
    <div v-if="isResolved" class="pwc-success__stats">
      <div class="pwc-success__stats-title">Процент решивших задачу:</div>
      <div class="pwc-success__stats-bar">
        <div :style="{ width: `${percent}%` }" :data-value="percent"></div>
      </div>
    </div>
    <div class="pwc-success__text">
      <img src="https://leonardo.osnova.io/822b0118-cca6-c5c1-445d-fa2d7168867e/" srcset="https://leonardo.osnova.io/b4170890-abcb-d14a-a4e8-f999caa86351/ 2x" alt="">
      <div v-html="text"></div>
    </div>
    <div v-if="isFilled" class="pwc-success__message" ref="message">Ваши данные уже отправлены PwC в России.</div>
    <div v-else class="pwc-success__form">
      <form class="pwc-form" @submit="submit">
        <label class="pwc-form__group">
          <div class="pwc-form__label">Имя<sup>*</sup></div>
          <div class="pwc-form__field">
            <input type="text" name="name" placeholder="Евгений Петров" required>
          </div>
        </label>
        <label class="pwc-form__group">
          <div class="pwc-form__label">Возраст<sup>*</sup></div>
          <div class="pwc-form__field">
            <input type="text" name="age" placeholder="27" required>
          </div>
        </label>
        <label class="pwc-form__group">
          <div class="pwc-form__label">Город<sup>*</sup></div>
          <div class="pwc-form__field">
            <input type="text" name="city" placeholder="Москва" required>
          </div>
        </label>
        <label class="pwc-form__group">
          <div class="pwc-form__label">E-mail<sup>*</sup></div>
          <div class="pwc-form__field">
            <input type="email" name="email" placeholder="cyberspace@protonmail.com" required>
          </div>
        </label>
        <label class="pwc-form__group">
          <div class="pwc-form__label">Кем вы сейчас работаете?<sup>*</sup></div>
          <div class="pwc-form__field">
            <textarea name="current_position" placeholder="Разработчик" required></textarea>
          </div>
        </label>
        <label class="pwc-form__group">
          <div class="pwc-form__label">Кем бы вы хотели работать?</div>
          <div class="pwc-form__field">
            <textarea name="desired_position" placeholder="Проектировщик нейроинтерфейсов"></textarea>
          </div>
        </label>
        <div class="pwc-form__button">
          <button type="submit" class="pwc-button">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import client from 'api-client';
import { mapGetters } from 'vuex';
import * as Analytics from '../lib/analytics';

export default {
  name: 'Success',
  data() {
    return {
      texts: {
        resolved: '<p>Поздравляем, вы решили задачу! Я — Катя, цифровой ассистент из аудиторско-консалтинговой сети фирм PwC в&nbsp;России.</p><p>Мир меняется, и&nbsp;с&nbsp;каждым годом мы ищем всё больше талантливых людей, которые разбираются в&nbsp;современных технологиях. Вы нашли вероятность, при которой сингулярный ИИ не&nbsp;сможет вас устранить, а&nbsp;для человека это уже неплохо.</p><p v-if="!isFilled">Заполните анкету, если будет интересно, чтобы мы пригласили вас на&nbsp;собеседование. Мы внимательно ознакомимся с&nbsp;вашими предпочтениями и&nbsp;просканируем вероятности развития будущего.</p>',
        resolvedAndFilled: '<p>Поздравляем, вы решили задачу! Я — Катя, цифровой ассистент из аудиторско-консалтинговой сети фирм PwC в&nbsp;России.</p><p>Мир меняется, и&nbsp;с&nbsp;каждым годом мы ищем всё больше талантливых людей, которые разбираются в&nbsp;современных технологиях. Вы нашли вероятность, при которой сингулярный ИИ не&nbsp;сможет вас устранить, а&nbsp;для человека это уже неплохо.</p>',
        notResolved: '<p>Пускай вы пока не&nbsp;решили задачу правильно, но&nbsp;мы ценим настойчивость. Я — Катя, цифровой ассистент из аудиторско-консалтинговой сети фирм PwC в&nbsp;России.</p><p>Мир меняется, и&nbsp;с&nbsp;каждым годом мы&nbsp;ищем всё больше талантливых людей, которые разбираются в&nbsp;современных технологиях.</p><p>Заполните анкету, если будет интересно, чтобы мы пригласили вас на&nbsp;собеседование. Мы внимательно ознакомимся с&nbsp;вашими предпочтениями и&nbsp;просканируем вероятности развития будущего.</p>',
        notResolvedAndFilled: '<p>Пускай вы пока не&nbsp;решили задачу правильно, но&nbsp;мы ценим настойчивость. Я — Катя, цифровой ассистент из аудиторско-консалтинговой сети фирм PwC в&nbsp;России.</p><p>Мир меняется, и&nbsp;с&nbsp;каждым годом мы&nbsp;ищем всё больше талантливых людей, которые разбираются в&nbsp;современных технологиях.</p>',
      },
      isSubmitting: false,
    };
  },
  computed: {
    ...mapGetters([
      'isResolved',
      'percent',
      'isFilled',
      'checkCount',
    ]),
    text() {
      if (this.isResolved && this.isFilled) {
        return this.texts.resolvedAndFilled;
      }

      if (this.isResolved) {
        return this.texts.resolved;
      }

      if (this.isFilled) {
        return this.texts.notResolvedAndFilled;
      }

      return this.texts.notResolved;
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (this.isSubmitting) {
        return;
      }

      Analytics.sendEvent('Submit profile');

      this.isSubmitting = true;

      const fd = new FormData(e.target);

      client
        .profile(fd)
        .then((resp) => {
          this.isSubmitting = false;

          if (resp.rc === 200) {
            this.$store.commit('setFilled', true);

            this.$nextTick(() => {
              this.$scrollTo(this.$refs.message);
            });
          }
        });
    },
  },
};
</script>

<style lang="stylus">
  .pwc-success

    &__stats
      margin-bottom: 60px

      @media (min-width: 680px)
        margin-bottom: 80px

    &__stats-title
      margin-bottom: 2em
      font-weight: 500
      font-size: 20px
      line-height: 1.2em
      color: #fff

    &__stats-bar
      position: relative
      width: 100%
      height: 30px
      background-color: #2D2D2D

      & > div
        position: absolute
        top: -8px
        left: 0
        height: 15px
        background-color: #FFB600

        &::after
          content: attr(data-value)'%'
          position: absolute
          top: -5px
          left: calc(100% + 10px)
          font-size: 20px
          font-weight: 500
          color: #FFB600

    &__text
      position: relative
      margin-bottom: 50px
      font-size: 18px
      line-height: 1.6em
      color: #FFB600

      @media (min-width: 1024px)
        padding-right: 200px

      & > img
        display: block
        width: 100px

        @media (max-width: 1023px)
          float: right

        @media (min-width: 680px)
          width: 130px

        @media (min-width: 1024px)
          position: absolute
          top: -25px
          right: 0
          width: auto

      & p:not(:last-child)
        margin-bottom: 2.22em

    &__message
      font-size: 18px
      line-height: 1.2em
      color: #fff

    &__form
      width: 550px
      max-width: 100%

  .pwc-form

    &__group
      display: block

      @media (min-width: 680px)
        display: flex
        align-items: flex-start

      &:not(:last-child)
        margin-bottom: 25px

    &__label
      margin-bottom: 10px
      line-height: 1.2em

      @media (min-width: 680px)
        flex-shrink: 0
        width: 210px
        margin-bottom: 0
        padding: 12px 15px 0 0
        font-size: 18px

      & > sup
        font-size: 14px
        color: #BA475A

        @media (min-width: 680px)
          font-size: 16px

    &__field
      width: 100%

      & > textarea
      & > input
        width: 100%
        height: 40px
        margin: 0
        padding: 0 15px
        font-family: inherit
        font-size: inherit
        font-weight: 400
        color: #000
        background: #F3F3F3
        border-radius: 5px
        border: 0
        box-shadow: inset 0 2px 0 #D1D1D1
        outline: none
        appearance: none

        @media (min-width: 680px)
          height: 50px

        &::placeholder
          color: #999999

      & > textarea
        height: 92px
        padding: 12px 15px
        resize: none

        @media (min-width: 680px)
          height: 112px
</style>
