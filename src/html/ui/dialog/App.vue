<template>
  <div class="dialog">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="showAlert('alert')">alert</cube-button>
          <cube-button @click="showAlert('confirm')">confirm</cube-button>
          <cube-button @click="showAlert('button')">button</cube-button>
          <cube-button @click="showAlert('configure')">configure</cube-button>
          <cube-button @click="showAlert('slot')">slot</cube-button>
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
      showAlert (status) {
        switch (status) {
          case 'alert':
            this.$createDialog({
              type: 'alert',
              title: '我是标题',
              content: '我是内容',
              icon: 'cubeic-alert'
            }).show()
            break
          case 'confirm':
            this.$createDialog({
              type: 'confirm',
              title: '我是标题',
              content: '我是内容',
              icon: 'cubeic-alert'
            }).show()
            break
          case 'button':
            this.$createDialog({
              type: 'confirm',
              icon: 'cubeic-alert',
              title: '我是标题',
              content: '我是内容',
              confirmBtn: {
                text: '确定按钮',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '取消按钮',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onConfirm: () => {
                this.$createToast({
                  type: 'correct',
                  time: 1000,
                  txt: '点击确认按钮'
                }).show()
              },
              onCancel: () => {
                this.$createToast({
                  type: 'warn',
                  time: 1000,
                  txt: '点击取消按钮'
                }).show()
              }
            }).show()
            break
          case 'configure':
            this.$createDialog({
              type: 'confirm',
              title: '自定义标题',
              content: '自定义内容',
              icon: 'cubeic-alert',
              showClose: true, // 显示关闭按钮
            }).show()
            break
          case 'slot':
            this.$createDialog({
              type: 'alert',
              confirmBtn: {
                text: '自定义插槽按钮',
                active: true
              }
            }, (createElement) => {
              return [
                createElement('div', {
                  'class': {
                    'my-title': true
                  },
                  slot: 'title'
                }, [
                  createElement('div', {
                    'class': {
                      'my-title-img': true
                    }
                  }),
                  createElement('p', '插槽标题')
                ]),
                createElement('p', {
                  'class': {
                    'my-content': true
                  },
                  slot: 'content'
                }, '这里是自定义插槽内容')
              ]
            }).show()
            break
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .dialog {
    height 100%
    background-color $color-background
  }

  .my-title {
    height 50px
    line-height 50px
    font-size $font-size-medium-x
  }

  .my-content {
    font-size $font-size-medium
    text-indent 2em
  }

  .dialog {
    .scroll-box {
      padding-bottom 20px
      button {
        margin 10px 0
      }
    }
  }
</style>
