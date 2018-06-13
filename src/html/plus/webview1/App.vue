<template>
  <div class="webview">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="jump">点击跳转下一个页面</cube-button>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { webview } from 'assets/js/webview'

  export default {
    mixins: [webviewMixin],
    data () {
      return {}
    },
    methods: {
      jump () {
        webview.openView({
          url: `./webview2.html`,
          id: 'webview2'
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .webview {
    height 100%
    background-color $color-background
  }

  .webview {
    .scroll-box {
      padding-bottom 20px
      .show-text {
        margin-top 20px
        text-align center
      }
    }
  }
</style>
