<template>
    <div class="pwc-table">
        <div class="pwc-table__container">
            <div class="pwc-table__row pwc-table__row--header" ref="columnHeader">
                <div class="pwc-table__cell"
                    v-bind:class="(index == activeIndex) ? 'active' : false"
                    v-for="(item, index) in rows.headers"
                    v-bind:key="index"
                    ref="items"
                    @mouseover="indicate(index)"
                >
                    {{item.title}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row2" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row3" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row4" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row5" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
               <div class="pwc-table__cell" v-for="(item, index) in rows.row6" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
               <div class="pwc-table__cell" v-for="(item, index) in rows.row7" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row8" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row9" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>
            <div class="pwc-table__row">
                <div class="pwc-table__cell" v-for="(item, index) in rows.row10" :key="index" @mouseover="indicate(index)">
                    {{item.index}}
                </div>
            </div>

        </div>

    </div>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      activeIndex: null,
      rows: {
        headers: [
          {
            key: 1,
            title: '',
          },
          {
            key: 2,
            title: 'X1',

          },
          { key: 3, title: 'X2' },
          { key: 4, title: 'X3' },
          { key: 5, title: 'X4' },
          { key: 6, title: 'X5' },
          { title: 'X6' },
          { title: 'X7' },
          { title: 'X8' },
          { title: 'X9' },
          { title: 'X10' },
        ],
        row: [
          { index: 'X1' },
          { index: '' },
          { index: '125' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '297' },
        ],
        row2: [
          { index: 'X2' },
          { index: '125' },
          { index: '' },
          { index: '151' },
          { index: '377' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '134' },
        ],
        row3: [
          { index: 'X3' },
          { index: '' },
          { index: '151' },
          { index: '' },
          { index: '266' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
        ],
        row4: [
          { index: 'X4' },
          { index: '' },
          { index: '377' },
          { index: '266' },
          { index: '' },
          { index: '115' },
          { index: '93' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
        ],
        row5: [
          { index: 'X5' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '115' },
          { index: '' },
          { index: '222' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
        ],
        row6: [
          { index: 'X6' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '93' },
          { index: '222' },
          { index: '' },
          { index: '135' },
          { index: '77' },
          { index: '' },
          { index: '' },
        ],
        row7: [
          { index: 'X7' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '135' },
          { index: '' },
          { index: '145' },
          { index: '' },
          { index: '' },
        ],
        row8: [
          { index: 'X8' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '77' },
          { index: '145' },
          { index: '' },
          { index: '65' },
          { index: '72' },
        ],
        row9: [
          { index: 'X9' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '65' },
          { index: '' },
          { index: '1' },
        ],
        row10: [
          { index: 'X10' },
          { index: '297' },
          { index: '134' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '' },
          { index: '72' },
          { index: '1' },
          { index: '' },
        ],
      },
    };
  },
  methods: {
    indicate(index) {
      this.activeIndex = index;
    },
  },

};

</script>

<style lang="stylus">
  .pwc-table
    &__container
        display flex
        flex-direction column
        width 300px
        max-width: 100%;
        border: 3px solid #64112F;

        @media (min-width: 425px)
            width 400px
        @media (min-width: 680px)
            width 444px
    &__row
        display flex
        flex-direction row
        &--header
            & .pwc-table__cell
                text-shadow: -1px 0 0 #0075ff;
                color: #e0301e;
            &  .pwc-table__cell.active
                background-color rgba(0, 56, 255, 0.22)
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
        width 25px
        font-size 9px
        box-shadow: inset 0px 0px 0px 0.69314px rgba(62,62,62,1);
        box-sizing: border-box;
        position relative
        color #ECECEC

        flex: 1 0 auto;
        height:auto;

        &:first-child
            text-shadow: -1px 0 0 #0075ff;
            color: #e0301e;

        &:hover
            cursor pointer
            background: rgba(238, 27, 66, 0.2);
            z-index 10
        &:before
            content:'';
            float:left;
            padding-top:100%;
            display table
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

        @media (min-width: 425px)
            width 30px
            font-size 14px
        @media (min-width: 680px)
            width 40px


</style>
