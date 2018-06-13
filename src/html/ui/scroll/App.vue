<template>
  <div class="loading">
    <!--<cube-scroll :options="scrollConf.options"-->
    <!--class="scroll-wrap"-->
    <!--&gt;-->
    <div class="scroll-box">
      <base-row title="基础使用" class="base">
        <cube-scroll ref="scroll1"
                     :data="scrollConf1.items"
                     :options="scrollConf1.options"
        ></cube-scroll>
        <cube-button class="scroll-to-btn" @click="scrollTo">滚动到指定位置</cube-button>
      </base-row>
      <base-row title="横向滚动" class="horizontal">
        <div class="scroll4-wrap">
          <cube-scroll ref="scroll4"
                       :data="scrollConf4.items"
                       :direction="scrollConf4.direction"
                       :options="scrollConf4.options"
          ></cube-scroll>
        </div>
      </base-row>
      <base-row title="上拉加载" class="up">
        <cube-scroll
          ref="scroll2"
          :data="scrollConf2.items"
          :options="scrollConf2.options"
          @pulling-up="onPullingUp"></cube-scroll>
      </base-row>
      <base-row title="下拉刷新" class="down">
        <cube-scroll
          ref="scroll3"
          :data="scrollConf3.items"
          :options="scrollConf3.options"
          @pulling-down="onPullingDown">
        </cube-scroll>
      </base-row>
    </div>
    <!--</cube-scroll>-->
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        scrollConf1: {
          items: [1, 2, 3, 4, 5],
          options: {
            scrollbar: {
              fade: false
            }
          }
        },
        scrollConf2: {
          items: [1, 2, 3, 4, 5],
          itemIndex: 5,
          options: {
            pullUpLoad: {
              threshold: 0,
              txt: {
                more: 'Load more',
                noMore: 'No more data'
              }
            }
          }
        },
        scrollConf3: {
          items: [1, 2, 3, 4, 5],
          options: {
            pullDownRefresh: {
              threshold: 20,
              stop: 40,
              txt: 'Refresh success'
            }
          }
        },
        scrollConf4: {
          items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
          direction: 'horizontal',
          options: {
            scrollbar: {
              fade: true
            }
          }
        },
      }
    },
    methods: {
      scrollTo () {
        this.$refs.scroll1.scrollTo(0, -200, 500, 'bounce')
      },
      onPullingUp () {
        console.log(this.$refs.scroll2)
        setTimeout(() => {
          if (Math.random() > 0.4) {
            let newPage = [
              'I am line ' + ++this.scrollConf2.itemIndex,
              'I am line ' + ++this.scrollConf2.itemIndex,
              'I am line ' + ++this.scrollConf2.itemIndex,
              'I am line ' + ++this.scrollConf2.itemIndex,
              'I am line ' + ++this.scrollConf2.itemIndex
            ]
            this.scrollConf2.items = this.scrollConf2.items.concat(newPage)
          } else {
            this.$refs.scroll2.forceUpdate()
          }
        }, 1000)
      },
      onPullingDown () {
        // Mock async load.
        setTimeout(() => {
          if (Math.random() > 0.5) {
            this.scrollConf3.items.unshift('I am new data: ' + +new Date())
          } else {
            this.$refs.scroll3.forceUpdate()
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .loading {
    height 100%
    background-color $color-background
  }

  .loading {
    .scroll-box {
      padding-bottom 20px
      .base {
        .scroll-to-btn {
          margin-top 10px
        }
        .cube-scroll-wrapper {
          height 100px
        }
      }
      .up {
        .cube-scroll-wrapper {
          height 150px
        }
      }
      .down {
        .cube-scroll-wrapper {
          height 150px
        }
      }
      .horizontal {
        .scroll4-wrap {
          position relative
          height 60px
          overflow hidden
          .cube-scroll-content {
            display inline-block
            position relative
            z-index 1
          }
          .cube-scroll-list {
            margin 0 auto
            height 100%
            white-space nowrap
          }
          .cube-scroll-item {
            display inline-block
            width 1.3rem
            height 100%
            white-space nowrap
          }
        }
      }
    }
  }
</style>
