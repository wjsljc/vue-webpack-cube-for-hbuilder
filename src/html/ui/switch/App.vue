<template>
  <div class="switch">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-switch v-model="switchConf1.value">
            Switch
          </cube-switch>
        </base-row>
        <base-row title="禁用状态">
          <cube-switch v-model="switchConf2.value"
                       :disabled="switchConf2.disabled"
          >
            无法取消
          </cube-switch>
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
        switchConf1: {
          value: false
        },
        switchConf2: {
          value: true,
          disabled: true
        }
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .switch {
    height 100%
    background-color $color-background
  }

  .switch {
    .scroll-box {
      padding-bottom 20px

    }
  }
</style>
