<template>
  <div class="button">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <cube-button>Button</cube-button>
        <cube-button type="submit" @click="tabBtn">Submit Button</cube-button>
        <cube-button :active="true">Active Button</cube-button>
        <cube-button :disabled="true">Disabled Button</cube-button>
        <cube-button icon="cubeic-right">Button With Icon</cube-button>
        <cube-button :light="true">Light Button</cube-button>
        <cube-button :inline="true">Inline Button</cube-button>
        <cube-button :outline="true">Outline Button</cube-button>
        <cube-button :primary="true">Primary Button</cube-button>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    mounted () {

    },
    methods: {
      plusReady () {
        window.addEventListener('buttonCustom', function (event) {
          console.log('event')
          console.log('接收自定义事件')
          console.log(JSON.stringify(event.detail))
        })
      },
      tabBtn () {
        alert('你点击了按钮')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .button {
    height 100%
    background-color $color-background
  }

  .button {
    .scroll-box {
      padding-bottom 20px
    }
    .cube-btn {
      display block
      width 90%
      margin 10px auto
    }
  }
</style>
