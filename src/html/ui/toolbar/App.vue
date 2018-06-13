<template>
  <div class="toolbar">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位" desc="占位文字"></cell>
        <cell title="占位末尾" desc="占位末尾文字"></cell>
      </div>
    </cube-scroll>
    <cube-toolbar
      :actions="actions"
      :more-actions="moreActions"
      @click="clickHandler"></cube-toolbar>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import Cell from "../../../components/cell/Cell";

  export default {
    components: {Cell},
    mixins: [webviewMixin],
    data () {
      return {
        actions: [
          {
            text: '玩魔兽',
            action: 'showText'
          },
          {
            text: '玩星际',
            checked: false,
            type: 'checkbox'
          },
          {
            text: '敲代码',
            action: 'moreMoney'
          }
        ],
        moreActions: [
          {
            text: '操作a',
            action: 'showText'
          },
          {
            text: '操作b',
            action: 'showText'
          },
          {
            text: '操作c',
            icon: 'cubeic-right',
            action: 'showText'
          }
        ]
      }
    },
    methods: {
      showText (item) {
        this.$createToast({
          type: 'correct',
          txt: 'clicked ' + item.text,
          time: 1000
        }).show()
      },
      moreMoney (item) {
        item.text = '敲不死你'
      },
      clickHandler (item) {
        console.log(item)
        if (item.action) {
          this[item.action](item)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .toolbar {
    height 100%
    background-color $color-background
  }

  .toolbar {
    .scroll-box {
      padding-bottom 80px
    }
    .cube-toolbar {
      bottom 12px
      .cube-toolbar-group {
        height 50px
      }
      .cube-toolbar-item {
        background-color $color-text
      }
      .border-right-1px::after {
        border-right 1px solid $color-background-d
      }
    }
  }
</style>
