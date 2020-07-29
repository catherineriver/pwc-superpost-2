<template>
    <div class="pwc-table">
        <div class="pwc-table__container" @mouseover=onHover @mouseleave=onMouseleave ref="table">
            <div class="pwc-table__row pwc-table__row--header" ref="columnHeader">
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X1</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X2</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X3</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X4</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X5</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X6</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X7</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X8</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X9</div>
                <div class="pwc-table__cell pwc-table__cell--title" v-bind:class="{ active: isActive }">X10</div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X1</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">125</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">297</div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X2</div>
                <div class="pwc-table__cell">125</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">151</div>
                <div class="pwc-table__cell">377</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">134</div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X3</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">151</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">266</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X4</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">377</div>
                <div class="pwc-table__cell">266</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">115</div>
                <div class="pwc-table__cell">93</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X5</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">115</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">222</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X6</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">93</div>
                <div class="pwc-table__cell">222</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">135</div>
                <div class="pwc-table__cell">77</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X7</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">135</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">145</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X8</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">77</div>
                <div class="pwc-table__cell">145</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">65</div>
                <div class="pwc-table__cell">72</div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X9</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">65</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">1</div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell pwc-table__cell--title">X10</div>
                <div class="pwc-table__cell">297</div>
                <div class="pwc-table__cell">134</div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell"></div>
                <div class="pwc-table__cell">72</div>
                <div class="pwc-table__cell">1</div>
                <div class="pwc-table__cell"></div>
            </div>

        </div>

    </div>
</template>


<style lang="stylus">
  .pwc-table
    &__container
        display flex
        flex-direction column
        width 432px
        border: 3px solid #64112F;
    &__row
        display flex
        flex-direction row
        &--header
            & .pwc-table__cell:first-child:hover
                background-color transparent
                cursor default
            & .pwc-table__cell:hover
                background-color rgba(0, 56, 255, 0.22)
                box-shadow none
        &:not(:first-child):hover .pwc-table__cell:first-child
            background-color rgba(0, 56, 255, 0.22)
            z-index 10
            box-shadow none


    &__cell
        display flex
        align-items center
        justify-content center
        width 40px
        height 40px
        flex-grow 1
        border: 1px solid #3E3E3E;
        box-sizing: border-box;
        position relative
        color #ECECEC

        &:hover
            cursor pointer
            background: rgba(238, 27, 66, 0.2);
            box-shadow: 0px 0px 0px 8px rgba(238, 27, 66, 0.2);
            z-index 10

        &--title
            text-shadow: -1px 0 0 #0075ff;
            color: #e0301e;

            &.active
                background-color rgba(0, 56, 255, 0.22)

        &::after
            content: ''
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            width: 100%
            height 100%
            background-color transparent
            background-image: linear-gradient(0deg, transparent 25%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.25) 50%, transparent 50%, transparent 75%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.25) 100%)
            background-size: 4px 4px


</style>

<script>

export default {
  name: 'Table',
  components: {

  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {

  },
  methods: {
    indexInParent(node) {
      const children = node.parentNode.childNodes;
      let num = 0;
      for (let i = 0; i < children.length; i += 1) {
        if (children[i] === node) return num;
        if (children[i].nodeType === 1) num += 1;
      }
      return -1;
    },
    onHover(event) {
      const header = this.$refs.columnHeader;
      const elem = header.querySelector('.active');
      const index = this.indexInParent(event.target);

      console.log(header.childNodes[index]);

      header.childNodes[index].classList.add('active');
      elem.classList.remove('active');
    },
    onMouseleave() {
      const header = this.$refs.columnHeader;
      const elem = header.querySelector('.active');

      if (!elem) {
        return null;
      }
      return elem.classList.remove('active');
    },
  },

};

</script>
