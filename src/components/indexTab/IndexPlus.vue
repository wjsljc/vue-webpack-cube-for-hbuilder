<template>
  <div class="index-plus">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
                 ref="scrollPlus"
    >
      <div class="scroll-box">
        <cell title="Camera" desc="Camera,相册与拍照" @click.native="jump('camera')"></cell>
        <cell title="Geolocation" desc="Geolocation设备位置信息" @click.native="jump('geolocation')"></cell>
        <cell title="Accelerometer" desc="Accelerometer模块管理设备加速度传感器" @click.native="jump('accelerometer')"></cell>
        <cell title="ResumeCallback" desc="ResumeCallback后台返回监听" @click.native="jump('resumeCallback')"></cell>
        <cell title="Header" desc="Header的综合应用" @click.native="jump('header')"></cell>
        <cell title="webview" desc="Webview页面跳转测试" @click.native="jump('webview1')"></cell>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import { indexMixin } from 'assets/js/mixins'
  import { webview } from 'assets/js/webview'
  import Cell from 'components/cell/Cell'

  export default {
    mixins: [indexMixin],
    components: {
      Cell
    },
    methods: {
      plusReady () {
        this.resetScroll()
      },
      resetScroll () {
        let self = this
        window.addEventListener('resetScroll', function (event) {
          console.log('接收自定义事件-indexPlus')
          self.$refs.scrollPlus.scrollTo(0, 0, 200, 'bounce')
        })
      },
      jump (id) {
        webview.openView({
          url: `./plus/${id}.html`,
          id: id
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .index-plus {

  }
</style>
