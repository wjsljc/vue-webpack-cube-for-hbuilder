<template>
  <div class="input">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="input">
          <cube-input v-model="value"
                      :disabled="switchConf.disabled"
                      :readonly="switchConf.readonly"
                      :maxlength="switchConf.maxlength ? maxlength: 10000"
                      :placeholder="placeholder"
                      :autofocus="switchConf.autofocus"
                      :autocomplete="autocomplete"
                      :clearable="switchConf.clearable"
                      :eye="eye"
                      :type="switchConf.password ? 'password' : 'text'"
          ></cube-input>
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
          <div class="row">
            <cube-switch v-model="switchConf.clearable">
              clearable
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.eye">
              eye
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.password">
              password
            </cube-switch>
          </div>
          <div class="row">
            <cube-switch v-model="switchConf.reverse">
              reverse
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
    mixins: [webviewMixin],
    data () {
      return {
        value: '',
        maxlength: 10,
        autocomplete: true,
        placeholder: '请输入...',
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
    computed: {
      eye () {
        let conf = null
        if (!this.switchConf.eye) {
          return false
        } else if (this.switchConf.reverse) {
          conf = {
            open: true,
            reverse: false
          }
        } else {
          conf = {
            open: false,
            reverse: true
          }
        }
        console.log(conf)
        return conf
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .input {
    height 100%
    background-color $color-background
  }

  .input {
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
