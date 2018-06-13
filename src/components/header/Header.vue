<template>
  <div class="m-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <h1 class="text">{{title}}</h1>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      back () {
        this.$emit('back')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    background-color $color-background
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .left
      position: absolute
      top: 0
      left: 0
      width 32px
      height 32px
    .right
      position: absolute
      top: 0
      right: 0
</style>
