<template>
  <div class="tip">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <cube-tip ref="tip" direction="bottom" style="left:123px;top:50px;">Tip</cube-tip>
        <base-row title="普通使用">
          <cube-button
            :inline="true"
            :outline="true"
            :primary="true"
            @click="$refs.tip.show()"
          >
            Show tip
          </cube-button>
        </base-row>
        <base-row title="方向控制">
          <p class="tip-eg" ref="tipWrap">
            <cube-button
              :inline="true"
              :outline="true"
              :primary="true"
              ref="btn"
              class="tip-demo2-btn"
              @click="$refs.tip.show()"
            >
              Show tip
            </cube-button>
            <cube-tip
              ref="tip2"
              :direction="direction"
              :style="tipStyle"
              @close="close"
              @click="clickHandler"
              class="tip-demo2-click"
            >
              <div>Awesome!</div>
            </cube-tip>
          </p>
          <cube-button class="click-btn" @click="showTip('bottom')">top</cube-button>
          <cube-button class="click-btn" @click="showTip('top')">bottom</cube-button>
          <cube-button class="click-btn" @click="showTip('left')">right</cube-button>
          <cube-button class="click-btn" @click="showTip('right')">left</cube-button>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'


  export default {
    mixins: [webviewMixin],
    data () {
      return {
        direction: '',
        tipStyle: ''
      }
    },
    methods: {
      showTip (direction) {
        this.direction = direction
        this.$refs.tip2.show()
        this.$nextTick(function () {
          let btnH = this.$refs.btn.$el.clientHeight
          let btnW = this.$refs.btn.$el.clientWidth
          let tipH = this.$refs.tip2.$el.clientHeight
          let tipW = this.$refs.tip2.$el.clientWidth
          let tipWrapH = this.$refs.tipWrap.offsetHeight
          let tipWrapW = this.$refs.tipWrap.offsetWidth
          console.log(tipH)

          switch (direction) {
            case 'top': // 在下
              this.tipStyle = `left: ${(tipWrapW - tipW) / 2}px; top: ${tipH}px`
              break
            case 'bottom': // 在上
              this.tipStyle = `left: ${(tipWrapW - tipW) / 2}px; top: ${-(tipH + 10)}px`
              break
            case 'left': // 在右
              this.tipStyle = `left: ${(tipWrapW + btnW) / 2 + 10}px; top: ${(btnH - tipH) / 2}px`
              break
            case 'right': // 在左
              this.tipStyle = `left: ${(tipWrapW - btnW) / 2 - tipW - 10}px; top: ${(btnH - tipH) / 2}px`
              break
          }
        })
      },
      close () {
        console.log('click close button')
      },
      clickHandler () {
        console.log('click tip area')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .tip {
    height 100%
    background-color $color-background
  }

  .tip {
    .scroll-box {
      padding-bottom 20px
      .tip-eg {
        position relative
        margin 60px
      }
      button.tip-demo2-btn {
        display block
        margin 0 auto
      }
      button.click-btn {
        display block
        padding 15px 0
        margin 10px auto
      }
    }
  }


</style>
