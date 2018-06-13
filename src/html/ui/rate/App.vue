<template>
  <div class="rate">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="rate">
          <cube-rate v-model="value"
                     :disabled="switchConf.disabled"
                     :max="max"
                     :justify="switchConf.justify"
          >
            <cube-rate-item v-if="switchConf.custom" v-for="n in max" :key="n" :value="value" :index="n">
              <!-- 定制星星示例 -->
              <div class="rate-item"></div>
            </cube-rate-item>
          </cube-rate>
        </base-row>
        <base-row title="配置项">
          <div class="row">
            <cube-switch v-model="switchConf.disabled">
              disabled
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.moreStart">
              增加星星个数
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.justify">
              是否自适应容器宽度
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.custom">
              是否自定义start样式
            </cube-switch>
          </div>
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
        value: 3,
        switchConf: {
          disabled: false,
          moreStart: false,
          justify: false,
          custom: false
        }
      }
    },
    computed: {
      max () {
        return this.switchConf.moreStart ? 10 : 5
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .rate {
    height 100%
    background-color $color-background
  }

  .rate {
    .scroll-box {
      padding-bottom 20px
      .row {
        height 50px
        line-height 50px
        padding 10px
        margin-bottom 5px
        background-color $color-highlight-background
      }
      .cube-rate-item {
        position relative
        width 32px
        height 32px
        .rate-item {
          width: 100%
          height: 100%
          background-size: 100%
          background-color: grey
        }
        &.cube-rate-item_active {
          .rate-item {
            background-color: orange
          }
        }
      }
    }
  }
</style>
