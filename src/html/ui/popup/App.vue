<template>
  <div class="popup">
    <base-row title="基础使用">
      <cube-popup ref="myPopup"
                  :type="popupConf.type"
                  :mask="popupConf.mask"
                  :center="popupConf.center"
                  :visible="popupConf.flag"
      >
        <p class="pop-content" @click="clickHide">My Popup Content 1</p>
      </cube-popup>
      <cube-button @click="showPopup('default')">
        默认配置
      </cube-button>
      <cube-button @click="showPopup('noMast')">
        没有mask
      </cube-button>
      <cube-button @click="showPopup('bottom')">
        置底
      </cube-button>
      <cube-button @click="showPopup('click')">
        点击才消失
      </cube-button>
    </base-row>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        popupConf: {
          sign: '',
          type: 'my-pop', // 会在根上面增加cube-[type]的类
          mask: true,
          flag: false,
          content: '', // 内容，无插槽时生效
          center: true, // 是否水平垂直居中
        }
      }
    },
    methods: {
      showPopup (refId) {
        this.popupConf.sign = refId
        switch (refId) {
          case 'default':
            this.popupConf.center = true
            this.popupConf.mask = true
            break
          case 'noMast':
            this.popupConf.mask = false
            this.popupConf.center = true
            break
          case 'bottom':
            this.popupConf.center = false
            this.popupConf.mask = true
            break
          case 'click':
            this.popupConf.center = true
            this.popupConf.mask = true
            break
        }
        const component = this.$refs.myPopup
        component.show()
        if (refId !== 'click') {
          setTimeout(() => {
            component.hide()
          }, 2000)
        } else {

        }
      },
      clickHide () {
        if (this.popupConf.sign === 'click') {
          this.$refs.myPopup.hide()
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .popup {
    height 100%
    background-color $color-background
  }

  .popup {
    .pop-content {
      height 50px
      width 200px
      margin 0 auto
      background-color $color-background-d
    }
    button {
      margin 10px 0
    }
    .cube-popup-content {
      height 50px
      line-height 50px
      text-align center
    }
  }
</style>
