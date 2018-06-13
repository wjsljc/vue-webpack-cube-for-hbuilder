<template>
  <div class="index">
    <div class="index-wrap" v-if="indexFlag">
      <div class="navigator">
        <ul class="nav-list flex-allCenter">
          <li v-for="(item, index) in slideConf.tabList"
              :key="index"
              @click="switchTab(index)"
              class="flex-1"
              :class="{active: slideConf.currentPage === index}"
          >
            {{ item.txt }}
          </li>
        </ul>
      </div>
      <div class="container">
        <cube-slide ref="slide"
                    :data="slideConf.tabList"
                    :initialIndex="slideConf.currentPage"
                    :threshold="slideConf.threshold"
                    :showDots="slideConf.showDots"
                    :autoPlay="slideConf.autoPlay"
                    :options="slideConf.options"
                    :loop="slideConf.loop"
                    @change="slideChange"
        >
          <cube-slide-item>
            <index-ui></index-ui>
          </cube-slide-item>
          <cube-slide-item>
            <index-plus></index-plus>
          </cube-slide-item>
          <cube-slide-item>
            <index-mine @loginOut="loginOut"></index-mine>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>
</template>

<script>
  import { webview } from 'assets/js/webview'
  import { indexMixin } from 'assets/js/mixins'
  import { SLIDER_FLAG, LOGIN_FLAG, AD_flag } from 'assets/js/storageConst'
  import { MyLocalStorage, checkADFlag, checkLoginFlag } from 'assets/js/utils'
  import IndexUi from 'components/indexTab/IndexUi'
  import IndexPlus from 'components/indexTab/IndexPlus'
  import IndexMine from 'components/indexTab/IndexMine'

  export default {
    mixins: [indexMixin],
    components: {
      IndexUi,
      IndexPlus,
      IndexMine,
    },
    data () {
      return {
        indexWating: null,
        indexFlag: false,
        slideConf: {
          currentPage: 0,
          autoPlay: false,
          showDots: false,
          threshold: 0.1,
          loop: false,
          options: {
            click: false
          },
          tabList: [
            {
              txt: 'UI',
              type: '123'
            },
            {
              txt: 'PLUS',
              type: '456'
            },
            {
              txt: 'ABOUT',
              type: '789'
            }
          ],
        },
      }
    },
    created () {
      console.log('create')
      console.log(window.receive)
      console.log(window)
      console.log(window.custom)
    },
    mounted () {
    },
    computed: {},
    methods: {
      plusReady () {
        console.log('plusReady')
        this.indexWating = webview.getIndexWaiting() // 首页绘制过渡层content
        let slider_flag = localStorage.getItem(SLIDER_FLAG)
        let login_flag = MyLocalStorage.Cache.get(LOGIN_FLAG)
        this.indexWating.show()
        this.beforeUse(slider_flag, login_flag)
        this.addEventListener() // 绑定监听事件
      },
      addEventListener () {
        let self = this
        window.addEventListener('custom', function (event) {
          console.log('event')
          console.log(event)
          console.log(event.detail)
          console.log(JSON.stringify(event.detail))
          self.showDialog()
        })
      },
      beforeUse (slider_flag, login_flag) {
        console.log('beforeUse')
        let self = this
        if (!slider_flag) { //没有走slider
          webview.openView({
            url: `./slider.html`,
            id: 'slider',
            titleNView: false,
          }, function () {
            self.indexWatingHide()
          })
        } else if (!login_flag) { // 没有登陆
          // self.indexWating && self.indexWating.hide()
          webview.openView({
            url: `./login.html`,
            id: 'login',
            titleNView: false
          }, function () {
            self.indexWatingHide()
          })
        } else {
          self.indexFlag = true
          setTimeout(() => {
            self.indexWatingHide()
          }, 500)
        }
        self.addListener()
      },
      addListener () {
        console.log('进入前后台监听')
        document.addEventListener("resume", this.resumeCallback, false) // 运行环境从后台切换到前台事件
        document.addEventListener("pause", this.pauseCallback, false)
      },
      indexWatingHide () {
        this.indexWating && this.indexWating.hide() && this.indexWating.clear()
        this.indexWating = null
        this.indexFlag = true
        this.$nextTick(() => {
          this.$refs.slide.refresh()
        })
      },
      switchTab (index) {
        this.slideConf.currentPage = index
      },
      slideChange (index) {
        this.slideConf.currentPage = index
      },
      resumeCallback () {
        let login_flag = checkLoginFlag()
        console.log('login_flag ' + login_flag)
        if (login_flag) {
          this.login()
        } else {
          MyLocalStorage.Cache.set(LOGIN_FLAG, true, 999999) // 切换回来登陆保持时长无限
        }
        let AD_flag = checkADFlag()
        console.log('AD_flag ' + AD_flag)
        if (AD_flag) {
          this.adShow()
        } else {
          this.showDialog()
        }
      },
      pauseCallback () {
        setTimeout(() => {
          MyLocalStorage.Cache.set(LOGIN_FLAG, true, 30) // 切换至后台登陆保持10分钟
        }, 1000)
      },
      showDialog () {
        setTimeout(() => {
          this.$createDialog({
            type: 'alert',
            title: '欢迎',
            content: '如果该项目给您带来了工作上的参考或者启发，亦或者期待更多其他项目的诞生和该项目的继续维护，支持作者原创扫描ABOUT中的二维码，为作者打赏吧！',
            icon: 'cubeic-alert'
          }).show()
        }, 1000)
      },
      login () {
        let loginPage = plus.webview.getWebviewById('login')
        if (loginPage) {
          plus.webview.show(loginPage.id)
        } else {
          webview.openView({
            url: `./login.html`,
            id: 'login',
            titleNView: false
          })
        }
      },
      adShow () {
        setTimeout(() => {
          webview.openView({
            url: `./advertisement.html`,
            id: 'advertisement',
            titleNView: false
          })
        }, 1000)
      },
      loginOut () {
        this.slideConf.currentPage = 0
      }
    },
    watch: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/flex.styl"

  html, body, .index {
    height: 100%
    background-color $color-background
  }

  .index {
    .index-wrap {
      height 100%
      .cube-slide-group {
        white-space normal
      }
      .cube-slide-item {
        text-align left
      }
      .container {
        overflow hidden
        height: calc(100% - 50px)
        .cube-scroll-wrapper {
          height 100%
          color $color-text
          .cube-scroll-list-wrapper, .cube-slide, .cube-slide-item {
            height 100%
          }
        }
      }

      .navigator {
        z-index 1000
        position fixed
        bottom 0
        left 0
        width 100%
        border-top 1px solid $color-theme
        background-color $color-background
        .nav-list {
          height 50px
          text-align center
          color $color-text
          li {
            height 30px
            line-height 30px
            margin 10px 0
            border-right 1px solid $color-theme-d
            &.active {
              color $color-theme
            }
            &:last-child {
              border-right 0
            }
          }
        }
      }
    }
  }
</style>
