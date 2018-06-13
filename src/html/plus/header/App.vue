<template>
  <div class="header">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button>请点击右上角体验原生绘制title</cube-button>
          <div class="bg">

          </div>
          <div class="img">
            <img src="../../../assets/img/zhifubao.png" alt="支持下作者吧"/>
          </div>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { plusReady } from 'assets/js/plusReady'
  import { checkClickRang } from 'assets/js/utils'

  export default {
    mixins: [webviewMixin],
    data () {
      return {}
    },
    methods: {
      plusReady () {
        this.initHeader()
      },
      initHeader () {
        let self = this
        let pageTitle = plus.webview.currentWebview().getTitleNView() // 获取当前title对象
        let customBtn = { // 新增家庭按钮信息
          tag: "img",
          id: "customBtn",
          src: '_www/static/icon/more.png',
          position: {
            top: "3px",
            left: "88%",
            width: "38px",
            height: "38px"
          }
        }
        pageTitle.draw(
          [{
            tag: customBtn.tag,
            id: customBtn.id,
            src: customBtn.src,
            position: {
              top: customBtn.position.top,
              left: customBtn.position.left,
              width: customBtn.position.width,
              height: customBtn.position.height
            }
          }]
        )
        pageTitle.addEventListener("click", function (e) {
          let rangeOk = checkClickRang(e, customBtn.position)
          if (rangeOk) {
            console.log("满足范围")
            self.showActionSheet()
          } else {
            console.log("点击范围不合法")
          }
        })
      },
      showActionSheet () {
        this.$createActionSheet({
          title: '我是标题~~~',
          active: 0,
          data: [
            {
              content: '12元管饱套餐'
            },
            {
              content: '15元性价套餐'
            },
            {
              content: '20元豪华套餐'
            }
          ],
          onSelect: (item, index) => {
            this.$createToast({
              txt: `Clicked ${item.content}`,
              type: 'correct',
              time: 1000
            }).show()
          },
          onCancel: () => {
            this.$createToast({
              txt: `Clicked canceled`,
              type: 'warn',
              time: 1000
            }).show()
          }
        }).show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .header {
    height 100%
    background-color $color-background
  }

  .header {
    .bg {
      width 100%
      height 300px
      margin 10px 0
      background url("../../../assets/img/weixin.png") no-repeat
      background-size 100% 100%
    }
    .img {
      width 100%
      margin 10px 0
      img {
        width 100%
      }
    }
    .scroll-box {
      padding-bottom 20px
      .show-text {
        margin-top 20px
        text-align center
      }
    }
  }
</style>
