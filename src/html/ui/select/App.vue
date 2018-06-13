<template>
  <div class="select">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="select">
          <cube-select
            v-model="selectConf.value"
            :options="selectConf.options"
            :title="selectConf.title"
            :placeholder="selectConf.placeholder"
            :auto-pop="switchConf.auto"
            :cancelTxt="selectConf.cancelTxt"
            :confirmTxt="selectConf.confirmTxt"
            @change="change"
            @picker-show="pickerShow"
            @picker-hide="pickerHide"
          >
          </cube-select>
          <div class="row">
            选择的值是：{{selectConf.value}}
          </div>
        </base-row>
        <base-row title="操作选项">
          <div class="row">
            <cube-switch v-model="switchConf.auto">
              auto(更改代码后刷新生效)
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
        selectConf: {
          options: [
            {
              value: 2014,
              text: '2014年'
            },
            {
              value: 2015,
              text: '2015年'
            }, {
              value: 2016,
              text: '2014年'
            }, {
              value: 2017,
              text: '2017年'
            },
            {
              value: 2018,
              text: '2018年'
            }
          ],
          value: '',
          title: '请选择年份',
          placeholder: '请选择',
          cancelTxt: '返回',
          confirmTxt: '选择'
        },
        switchConf: {
          auto: false,
          disabled: false
        }
      }
    },
    methods: {
      change (value, index, text) {
        const toast = this.$createToast({
          time: 1000,
          type: 'correct',
          txt: `选项发生变化：${value} + ${index} + ${text}`
        })
        toast.show()
      },
      pickerShow () {
        const toast = this.$createToast({
          time: 1000,
          type: 'correct',
          txt: `picker打开`
        })
        toast.show()
      },
      pickerHide () {
        const toast = this.$createToast({
          time: 1000,
          type: 'warn',
          txt: `picker关闭`
        })
        toast.show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .select {
    height 100%
    background-color $color-background
  }

  .select {
    .scroll-box {
      padding-bottom 20px
      .cube-select {
        height 50px
        padding-top 15px
      }
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
