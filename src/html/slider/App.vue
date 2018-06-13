<template>
  <div class="slider">
    <cube-slide :autoPlay="sliderConf.autoPlay"
                :loop="sliderConf.loop"
    >
      <cube-slide-item>
        <div class="box">
          <h3>欢迎使用vue-webpack-mint </h3>
          <h4>for hbuilder</h4>
        </div>
      </cube-slide-item>
      <cube-slide-item>
        <div class="box">
          <h3>制作</h3>
          <h4>By LJC</h4>
        </div>
      </cube-slide-item>
      <cube-slide-item>
        <div class="box">
          <cube-button type="submit" @click="start">开启新的体验</cube-button>
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
  import { webview } from 'assets/js/webview'
  import { SLIDER_FLAG, LOGIN_FLAG } from 'assets/js/storageConst'
  import { MyLocalStorage } from 'assets/js/utils'

  export default {
    data () {
      return {
        sliderConf: {
          autoPlay: false,
          loop: false,
          options: {
            stopPropagation: true
          },
        }
      }
    },
    created () {

    },
    methods: {
      start () {
        localStorage.setItem(SLIDER_FLAG, true)
        webview.openView({
          url: `./login.html`,
          id: 'login',
          titleNView: false
        }, function () {
          setTimeout(() => {
            let currentView = plus.webview.currentWebview()
            currentView.close('none')
          }, 500)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .slider {
    height 100%
    background-color $color-background
  }

  .slider {
    .cube-slide-dots {
      bottom 10px
      span {
        height 4px
      }
    }
    .cube-slide-item {
      position relative
      .box {
        z-index 999
        position absolute
        left 50%
        top 45%
        width 100%
        transform translate3d(-50%, -50%, 0)
        button {
          display block
          width 70%
          margin 0 auto
        }
        h3, h4 {
          padding 10px 0
        }
        h3 {
          font-size $font-size-large
        }
        h4 {
          font-size $font-size-large-x
          font-weight bold
        }
      }
    }
  }
</style>
