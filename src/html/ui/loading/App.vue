<template>
  <div class="loading">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <cube-loading></cube-loading>
        <cube-loading :size="28"></cube-loading>
        <cube-loading :size="40"></cube-loading>
        <cube-loading :size="80"></cube-loading>
        <cube-loading :size="120"></cube-loading>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .loading {
    height 100%
    background-color $color-background
  }

  .loading {
    .scroll-box {
      padding-bottom 20px
      .cube-loading-spinners {
        display block
        margin 10px auto
        text-align center
      }
    }
  }
</style>
