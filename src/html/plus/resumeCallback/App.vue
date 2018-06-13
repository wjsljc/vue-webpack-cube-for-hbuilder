<template>
  <div class="resumeCallback">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          123
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { plusReady } from 'assets/js/plusReady'

  export default {
    mixins: [webviewMixin],
    data () {
      return {}
    },
    created () {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady () {
        document.addEventListener("resume", this.resumeCallback, false); // 运行环境从后台切换到前台事件
        plus.key.addEventListener('backbutton', function () {
          let currentView = plus.webview.currentWebview()
          currentView.close()
        })
      },
      resumeCallback () {
        this.ad()
      },
      ad () {
        setTimeout(() => {
          this.$createDialog({
            type: 'alert',
            title: '欢迎回来',
            content: '如果该项目给您带来了工作上的参考或者启发，亦或者期待更多其他项目的诞生和该项目的继续维护，支持作者原创扫描ABOUT中的二维码，为作者打赏吧！',
            icon: 'cubeic-alert'
          }).show()
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .resumeCallback {
    height 100%
    background-color $color-background
  }

  .resumeCallback {
    .scroll-box {
      padding-bottom 20px
      .show-text {
        margin-top 20px
        text-align center
      }
    }
  }
</style>
