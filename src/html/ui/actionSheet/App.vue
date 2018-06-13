<template>
  <div class="actionSheet">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="showActionSheet('base')">操作列表</cube-button>
          <cube-button @click="showActionSheet('highlight')">高亮显示</cube-button>
          <cube-button @click="showActionSheet('style')">样式设定</cube-button>
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
      return {}
    },
    methods: {
      showActionSheet (status) {
        switch (status) {
          case 'base':
            this.$createActionSheet({
              title: '我是标题~~~',
              data: [
                {
                  content: '<em>align - center</em>',
                  class: 'cube-foo'
                },
                {
                  content: 'align - left',
                  align: 'left'
                },
                {
                  content: 'align - right',
                  align: 'right'
                }
              ],
              onSelect: (item, index) => {
                this.$createToast({
                  txt: `Clicked ${item.content}`,
                  time: 1000
                }).show()
              }
            }).show()
            break
          case 'highlight':
            this.$createActionSheet({
              title: '我是标题~~~',
              active: 0,
              data: [
                {
                  content: '12元管饱套餐'
                },
                {
                  content: '15元性价套餐'
                },
                {
                  content: '20元豪华套餐'
                }
              ],
              onSelect: (item, index) => {
                this.$createToast({
                  txt: `Clicked ${item.content}`,
                  type: 'correct',
                  time: 1000
                }).show()
              },
              onCancel: () => {
                this.$createToast({
                  txt: `Clicked canceled`,
                  type: 'warn',
                  time: 1000
                }).show()
              }
            }).show()
            break
          case 'style':
            this.$createActionSheet({
              title: '我是标题~~~',
              pickerStyle: true,
              data: [
                {
                  content: '12元管饱套餐'
                },
                {
                  content: '15元性价套餐'
                },
                {
                  content: '20元豪华套餐'
                }
              ],
              onSelect: (item, index) => {
                this.$createToast({
                  txt: `Clicked ${item.content}`,
                  type: 'correct',
                  time: 1000
                }).show()
              },
              onCancel: () => {
                this.$createToast({
                  txt: `Clicked canceled`,
                  type: 'warn',
                  time: 1000
                }).show()
              }
            }).show()
            break
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .actionSheet {
    height 100%
    background-color $color-background
  }

  .actionSheet {
    .scroll-box {
      padding-bottom 20px
      button {
        margin 10px 0
      }
    }
  }
</style>
