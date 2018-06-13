<template>
  <div class="textarea">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="textarea">
          <cube-textarea v-model="value"
                         :disabled="switchConf.disabled"
                         :readonly="switchConf.readonly"
                         :maxlength="switchConf.maxlength ? maxlength: 10000"
                         :placeholder="placeholder"
                         :autofocus="switchConf.autofocus"
                         @focus="focus"
                         @blur="blur"
          ></cube-textarea>
        </base-row>
        <base-row title="操作选项">
          <div class="row">
            <cube-switch v-model="switchConf.disabled">
              disabled
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.readonly">
              readonly
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.maxlength">
              maxlength:10
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.autofocus">
              autofocus(手机上可能无效)
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
    name: 'Textarea',
    mixins: [webviewMixin],
    data () {
      return {
        value: '',
        placeholder: '请输入内容',
        maxlength: 10,
        switchConf: {
          disabled: false,
          readonly: false,
          maxlength: false,
          autofocus: true,
          clearable: true,
          eye: true,
          reverse: true,
          password: true
        }
      }
    },
    methods: {
      focus (e) {
        const toast = this.$createToast({
          time: 1000,
          type: 'correct',
          txt: '获取到焦点'
        })
        toast.show()
        console.log(e)
      },
      blur (e) {
        const toast = this.$createToast({
          time: 1000,
          type: 'warn',
          txt: '失去了焦点'
        })
        toast.show()
        console.log(e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .textarea {
    height 100%
    background-color $color-background
  }

  .textarea {
    .scroll-box {
      padding-bottom 20px
      .row {
        height 50px
        line-height 50px
        padding 10px
        margin-bottom 5px
        background-color $color-highlight-background
      }
    }
  }
</style>
