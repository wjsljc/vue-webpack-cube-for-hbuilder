<template>
  <div class="checkbox">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-checkbox v-model="checkboxConf1.checked" :position="checkboxConf1.position">
            文字内容
          </cube-checkbox>
        </base-row>
        <base-row title="初始选中，左右可调">
          <cube-checkbox v-model="checkboxConf2.checked" :position="checkboxConf2.position">
            文字内容
          </cube-checkbox>
        </base-row>
        <base-row title="形状可变">
          <cube-checkbox v-model="checkboxConf3.checked"
                         :position="checkboxConf3.position"
                         :shape="checkboxConf3.shape"
          >
            文字内容
          </cube-checkbox>
        </base-row>
        <base-row title="禁用状态">
          <cube-checkbox v-model="checkboxConf4.checked"
                         :option="checkboxConf4.option"
                         :position="checkboxConf4.position"
          >
            文字内容
          </cube-checkbox>
        </base-row>
        <base-row title="镂空样式只支持方形">
          <cube-checkbox v-model="checkboxConf5.checked"
                         :position="checkboxConf5.position"
                         :shape="checkboxConf5.shape"
                         :hollow-style="checkboxConf5.hollow"
          >
            文字内容
          </cube-checkbox>
        </base-row>
        <base-row title="获取选中的值">
          <cube-checkbox v-model="checkboxConf6.checked"
                         :position="checkboxConf6.position"
                         :shape="checkboxConf6.shape"
                         :option="checkboxConf6.option"
          >
            文字内容1
          </cube-checkbox>
          <cube-checkbox v-model="checkboxConf7.checked"
                         :position="checkboxConf7.position"
                         :shape="checkboxConf7.shape"
                         :option="checkboxConf7.option"
          >
            文字内容2
          </cube-checkbox>
          <div class="res">
            显示的结果是： {{res}}
          </div>
        </base-row>
        <base-row title="复选框组">
          <cube-checkbox-group v-model="checkboxGroupConf1.value"
                               :options="checkboxGroupConf1.options"
                               :shape="checkboxGroupConf1.shape"
                               :hollow-style="checkboxGroupConf1.hollow"
                               :horizontal="checkboxGroupConf1.horizontal"
          />
          <cube-checkbox-group v-model="checkboxGroupConf2.value"
                               :options="checkboxGroupConf2.options"
                               :shape="checkboxGroupConf2.shape"
                               :hollow-style="checkboxGroupConf2.hollow"
                               :horizontal="checkboxGroupConf2.horizontal"
          />
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  export default {
    mixins: [webviewMixin],
    computed: {
      res () {
        let res = ''
        res += this.checkboxConf6.checked ? this.checkboxConf6.option.value + ' ' : ''
        res += this.checkboxConf7.checked ? this.checkboxConf7.option.value + ' ' : ''
        return res
      }
    },
    data () {
      return {
        checkboxConf1: {
          checked: false,
          position: 'right'
        },
        checkboxConf2: {
          checked: true,
        },
        checkboxConf3: {
          checked: false,
          position: 'right',
          shape: 'square'
        },
        checkboxConf4: {
          checked: false,
          position: 'right',
          option: {
            disabled: true
          }
        },
        checkboxConf5: {
          checked: false,
          position: 'right',
          shape: 'square',
          hollow: true
        },
        checkboxConf6: {
          checked: false,
          position: 'right',
          option: {
            value: '文本1',
          }
        },
        checkboxConf7: {
          position: 'right',
          checked: false,
          option: {
            value: '文本2',
          }
        },
        checkboxGroupConf1: {
          value: [1, 2, 3, 4],
          shape: 'square',
          hollow: false,
          horizontal: false,
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
              disabled: true
            }
          ]
        },
        checkboxGroupConf2: {
          value: [1, 2, 3, 4],
          shape: 'circle',
          hollow: false,
          horizontal: true,
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
              disabled: true
            }
          ]
        }
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .checkbox {
    height 100%
    background-color $color-background
  }

  .checkbox {
    .scroll-box {
      padding-bottom 20px
      .cube-checkbox_disabled .cube-checkbox-ui {
        background-color grey
        i {
          color $color-background-d
        }
      }
      .cube-checkbox {
        border 1px solid $color-theme-d
        background-color $color-background-d
        .cube-checkbox-ui {
          width $font-size-large
          height $font-size-large
          font-size $font-size-large
        }
        .cube-checkbox-label {
          line-height $font-size-large
        }
      }
      .cube-checkbox-group {
        background-color $color-background
      }
      .border-top-1px::before, .cube-checkbox-group[data-horz="true"]::after {
        border 1px solid $color-theme-d
      }
      .border-bottom-1px::after, .border-right-1px::after {
        border 0
      }
      .res {
        height 50px
        line-height 50px
        text-align center
      }
    }
  }
</style>
