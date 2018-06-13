<template>
  <transition name="slide">
    <div class="index-list">
      <m-header @back="back">
        <div slot="left">
          <div class="back" @click="back">返回</div>
        </div>
        <div slot="right" v-if="custom">
          <div class="save" @click="save">保存</div>
        </div>
      </m-header>
      <cube-index-list
        :ref="refs"
        :data="data"
        :title="title"
        :pullUpLoad="pullUpLoad"
        :pullDownRefresh="pullDownRefresh"
        @select="selectItem"
        @title-click="clickTitle"
        @pulling-up="onPullingUp"
        @pulling-down="onPullingDown"
      >
        <slot v-if="custom"></slot>
      </cube-index-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/header/Header'

  export default {
    components: {
      MHeader
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        default: '',
        required: false
      },
      custom: {
        type: Boolean,
        default: false
      },
      refs: {
        type: String,
        default: null
      },
      pullUpLoad: {
        default: false
      },
      pullDownRefresh: {
        default: false
      }
    },
    created () {
    },
    data () {
      return {}
    },
    methods: {
      back () {
        this.$emit('back')
      },
      save () {
        this.$emit('save')
      },
      selectItem (item) {
        this.$emit('select', item)
      },
      clickTitle () {
        this.$emit('title-click')
      },
      onPullingUp () {
        this.$emit('pulling-up', this)
        // this.$refs[this.refs].forceUpdate()
      },
      onPullingDown () {
        this.$emit('pulling-down', this)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  .index-list {
    z-index 100
    position absolute
    top 0
    bottom 44px
    left 0
    right 0
    width 100%
    background-color $color-background
    .save {
      width auto
      height 44px
      line-height 44px
      text-align center
      padding 0 10px
      font-size: $font-size-medium-x
      color: $color-theme
    }
    .back {
      display: block
      min-width 40px
      max-width 100px
      height 44px
      line-height 44px
      padding 0 10px
      text-align center
      letter-spacing 1px
      font-size: $font-size-medium-x
      color: $color-theme
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
