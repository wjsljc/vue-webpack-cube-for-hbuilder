<template>
  <div class="row flex-row">
    <div class="row-left flex-9">
      <div class="row-left-title">{{title}}</div>
      <div class="row-left-desc">{{desc}}</div>
    </div>
    <div class="row-right flex-1">
      <i class="cubeic-arrow"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: null
      },
      desc: {
        type: String,
        default: null
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/flex.styl"
  .row {
    height 50px
    padding 5px 10px
    border-bottom 1px solid $color-theme-d
    text-align left
    .row-left {
      max-width 90%
      .row-left-title {
        font-size $font-size-large
        color $color-theme
        letter-spacing 1px
        line-height 25px
      }
      .row-left-desc {
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size $font-size-small
        line-height 25px
      }
    }
    .row-right {
      line-height 40px
      text-align center
    }
  }
</style>
