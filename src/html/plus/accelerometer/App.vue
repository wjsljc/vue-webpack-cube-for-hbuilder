<template>
  <div class="accelerometer">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="cardTurn">摇一摇</cube-button>
          <div id="cardWrap" class="cardWrap" ref="cardWrap">
            {{accelerometerInfo.text}}
          </div>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { plusReady } from "../../../assets/js/plusReady";

  const MAX = 20 // 翻转偏移量

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        accelerometerInfo: {
          flag: false,
          cardDom: null,
          player: null,
          timer: null,
          text: '卡片',
          id: null
        }
      }
    },
    created () {
      plusReady(this.plusReady)
    },
    mounted () {
      this.accelerometerInfo.cardDom = this.$refs.cardWrap
    },
    methods: {
      plusReady () {
        let self = this
        plus.screen.lockOrientation('portrait-primary')
        self.watchAcceleration()
        plus.key.addEventListener('backbutton', function () {
          if (self.accelerometerInfo.id) {
            plus.accelerometer.clearWatch(self.accelerometerInfo.id)
          }
          let currentView = plus.webview.currentWebview()
          currentView.close()
        })
      },
      watchAcceleration () {
        let self = this
        self.accelerometerInfo.id = plus.accelerometer.watchAcceleration(function (a) {
          if (!self.accelerometerInfo.cardDom) {
            return;
          }
          if (!self.accelerometerInfo.player && (Math.abs(a.xAxis) + Math.abs(a.yAxis) + Math.abs(a.zAxis) > MAX)) {
            console.log("搖一搖成功");
            self.cardTurn();
          } else {

          }
        }, function (e) {
          console.log("摇一摇失败");
        }, {
          frequency: 200 // 更新加速度信息间隔时间
        });
      },
      cardTurn () {
        let self = this
        let player = self.accelerometerInfo.player
        if (!player) {
          player = plus.audio.createPlayer('/static/media/shake.wav')
          console.log('player ' + JSON.stringify(player))
          player.play()
        }
        setTimeout(function () {
          player && player.stop()
          delete self.accelerometerInfo.player
          player = null
        }, 1000);
        self.accelerometerInfo.cardDom.style.webkitTransform = 'rotateY(180deg)';
        self.accelerometerInfo.cardDom.style.msTransform = 'rotateY(180deg)';
        if (self.accelerometerInfo.timer) {
          clearTimeout(self.accelerometerInfo.timer);
        }
        self.accelerometerInfo.timer = setTimeout(function () {
          self.accelerometerInfo.timer = null;
          self.accelerometerInfo.cardDom.style.webkitTransform = '';
          self.accelerometerInfo.cardDom.style.msTransform = '';
        }, 500);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .accelerometer {
    height 100%
    background-color $color-background
  }

  .accelerometer {
    .scroll-box {
      padding-bottom 20px
      .cardWrap {
        width 90%
        height 250px
        line-height 250px
        margin 10px auto
        text-align center
        border 1px solid $color-text
        transition all .5s
      }
    }
  }
</style>
