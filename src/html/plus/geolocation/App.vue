<template>
  <div class="geolocation">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="getLocation">获取当前地理信息</cube-button>
          <p v-show="locationInfo.flag" class="show-text">{{locationInfo.address}}</p>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        locationInfo: {
          flag: false,
          address: ''
        },
        loading: null
      }
    },
    methods: {
      getLocation () {
        let self = this
        self.loading = self.$createToast({
          time: 0,
          txt: '加载中',
          mask: true,
          type: 'loading'
        }).show()
        plus.geolocation.getCurrentPosition(function (p) {
          console.log("地理信息 " + JSON.stringify(p));
          self.locationInfo.address = p.address.province + p.address.city + p.address.district + p.address.street + p.address.streetNum;
          self.locationInfo.flag = true
          self.loading.hide()
        }, function (e) {
          console.log("错误 " + JSON.stringify(e));
          self.loading.hide()
        }, {
          enableHighAccuracy: true, //是否高精确度获取位置信息
          provider: 'amap', //优先使用高德地图
          geocode: true //是否开启地址解析
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .geolocation {
    height 100%
    background-color $color-background
  }

  .geolocation {
    .scroll-box {
      padding-bottom 20px
      .show-text{
        margin-top 20px
        text-align center
      }
    }
  }
</style>
