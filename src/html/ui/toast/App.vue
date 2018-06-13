<template>
  <div class="toast">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="showToastTime1">显示1s</cube-button>
          <cube-button @click="showToastTime2">没有遮罩</cube-button>
          <cube-button @click="showToastTime3('loading')">loading</cube-button>
          <cube-button @click="showToastTime3('correct')">correct</cube-button>
          <cube-button @click="showToastTime3('error')">error</cube-button>
          <cube-button @click="showToastTime3('warn')">warn</cube-button>
        </base-row>
        <base-row title="深入使用">
          <cube-button @click="showToastTime4">事件回调</cube-button>
          <cube-button @click="showToastTime5">点击消失</cube-button>
        </base-row>
      </div>
    </cube-scroll>
    <div class="close" @click="close" v-show="toast">我知道了</div>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        toast: null
      }
    },
    methods: {
      showToastTime1 () {
        const toast = this.$createToast({
          time: 1000,
          txt: '显示1s',
          mask: true
        })
        toast.show()
      },
      showToastTime2 () {
        const toast = this.$createToast({
          time: 1000,
          txt: '我没有遮罩',
          mask: false
        })
        toast.show()
        setTimeout(() => {
          toast.hide()
        }, 2000)
      },
      showToastTime3 (status) {
        let toast = null
        switch (status) {
          case 'loading':
            toast = this.$createToast({
              time: 2000,
              txt: '加载中',
              mask: true,
              type: status
            })
            break
          case 'correct':
            toast = this.$createToast({
              time: 2000,
              txt: '正确',
              mask: true,
              type: status
            })
            break
          case 'error':
            toast = this.$createToast({
              time: 2000,
              txt: '错误',
              mask: true,
              type: status
            })
            break
          case 'warn':
            toast = this.$createToast({
              time: 2000,
              txt: '警告',
              mask: true,
              type: status
            })
            break
        }
        toast.show()
      },
      showToastTime4 () {
        const toast = this.$createToast({
          time: 2000,
          txt: '显示1s',
          mask: true,
          onTimeout: () => {
            alert('结束回调')
          }
        })
        toast.show()
      },
      showToastTime5 () {
        this.toast = this.$createToast({
          time: 0,
          txt: '通知',
          mask: true,
        })
        this.toast.show()
      },
      close () {
        this.toast.hide()
        this.toast = null
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .toast {
    height 100%
    background-color $color-background
  }

  .toast {
    .scroll-box {
      padding-bottom 20px
      button {
        margin 10px 0
      }
    }
    .close {
      z-index 9999
      position absolute
      top 20px
      right 5px
      width 80px
      padding 10px
      text-align center
      color $color-text
      border 1px solid $color-text
    }
  }
</style>
