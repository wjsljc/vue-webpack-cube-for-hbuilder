<template>
  <div class="base-row-wrap">
    <div class="base-row">
      <div class="base-row-title">
        {{title}}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: null
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  .base-row-wrap {
    width 100%
    .base-row {
      width calc(100% - 20px)
      padding 10px
      .base-row-title {
        height 50px
        line-height 50px
        font-size $font-size-large
        color $color-theme
        letter-spacing 1px
      }
    }
  }
</style>
