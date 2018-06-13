<template>
  <div class="form">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="完整的基础使用">
          <cube-form
            ref="form"
            :model="formConf1.model"
            :schema="formConf1.schema"
            :immediate-validate="formConf1.immediateValidate"
            :options="formConf1.options"
            @validate="validateHandler"
            @submit="submitHandler"
            @reset="resetHandler"
          >
          </cube-form>
        </base-row>
        <base-row title="操作选项">
          <div class="row">
            <cube-switch v-model="switchConf.layout">
              切换布局
            </cube-switch>
          </div>
          <div class="btn-row">
            <cube-button @click="submitBySelf">手动验证按钮</cube-button>
            <cube-button @click="resetBySelf">手动重置按钮</cube-button>
            <cube-button @click="submitByAsyn">异步校验</cube-button>
          </div>
        </base-row>
        <base-row title="自定义插槽内容">
          <cube-form :model="formConf2.model" @validate="validateHandler" @submit="submitHandler">
            <cube-form-group>
              <cube-form-item :field="formConf2.fields[0]"></cube-form-item>
              <!--<cube-form-item :field="formConf2.fields[1]"></cube-form-item>-->
            </cube-form-group>
            <cube-form-group>
              <cube-button type="submit">Submit</cube-button>
            </cube-form-group>
          </cube-form>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'

  //  const PCA = {
  //    props: {
  //      value: {
  //        type: Array,
  //        default () {
  //          return []
  //        }
  //      }
  //    },
  //    data () {
  //      return {
  //        selected: []
  //      }
  //    },
  //    render (createElement) {
  //      return createElement('cube-button', {
  //        on: {
  //          click: this.showPicker
  //        }
  //      }, this.selected.length ? this.selected.join(' ') : 'placeholder')
  //    },
  //    mounted () {
  //      this.picker = this.$createCascadePicker({
  //        title: 'PCA Select',
  //        data: cityData,
  //        selectedIndex: this.value,
  //        onSelect: this.selectHandler
  //      })
  //    },
  //    methods: {
  //      showPicker () {
  //        this.picker.show()
  //      },
  //      selectHandler (selectedVal, selectedIndex, selectedTxt) {
  //        this.selected = selectedTxt
  //        this.$emit('input', selectedVal)
  //      }
  //    }
  //  }

  export default {
    mixins: [webviewMixin],
//    components: {
//      DatePicker
//    },
    data () {
      return {
        switchConf: {
          layout: false
        },
        formConf1: {
          validity: {},
          valid: undefined,
          layout: true, // 表单布局开关
          model: { // 表单提交的所有数据
            checkboxValue: false,
            checkboxGroupValue: [],
            inputValue: '',
            radioValue: '',
            rateValue: 1,
            selectValue: 2018,
            switchValue: true,
            textareaValue: '',
            uploadValue: []
          },
          immediateValidate: false, // 是否立即验证
          schema: { // 生成表单的形式
            groups: [
              {
                legend: '基础',
                fields: [
                  {
                    type: 'checkbox',
                    modelKey: 'checkboxValue',
                    props: {
                      option: {
                        label: 'Checkbox',
                        value: true
                      }
                    },
                    rules: {
                      required: true
                    },
                    messages: {
                      required: 'Please check this field'
                    }
                  },
                  {
                    type: 'checkbox-group',
                    modelKey: 'checkboxGroupValue',
                    label: 'CheckboxGroup',
                    props: {
                      options: ['1', '2', '3']
                    },
                    rules: {
                      required: true
                    }
                  },
                  {
                    type: 'input',
                    modelKey: 'inputValue',
                    label: 'Input',
                    props: {
                      placeholder: '请输入'
                    },
                    rules: {
                      required: true
                    },
                    // validating when blur
                    trigger: 'blur'
                  },
                  {
                    type: 'radio-group',
                    modelKey: 'radioValue',
                    label: 'Radio',
                    props: {
                      options: ['1', '2', '3']
                    },
                    rules: {
                      required: true
                    }
                  },
                  {
                    type: 'select',
                    modelKey: 'selectValue',
                    label: 'Select',
                    props: {
                      options: [2015, 2016, 2017, 2018, 2019, 2020]
                    },
                    rules: {
                      required: true
                    }
                  },
                  {
                    type: 'switch',
                    modelKey: 'switchValue',
                    label: 'Switch',
                    rules: {
                      required: true
                    }
                  },
                  {
                    type: 'textarea',
                    modelKey: 'textareaValue',
                    label: 'Textarea',
                    rules: {
                      required: true
                    },
                    // debounce validate
                    // if set to true, the default debounce time will be 200(ms)
                    debounce: 100
                  }
                ]
              },
              {
                legend: '高级',
                fields: [
                  {
                    type: 'rate',
                    modelKey: 'rateValue',
                    label: 'Rate',
                    rules: {
                      required: true
                    }
                  },
                  {
                    type: 'upload',
                    modelKey: 'uploadValue',
                    label: 'Upload',
                    events: { // 自定义事件
                      'file-removed': (...args) => { // 照片删除
                        console.log('file removed', args)
                      }
                    },
                    rules: {
                      required: true,
                      uploaded: (val, config) => {
                        return Promise.all(val.map((file, i) => {
                          return new Promise((resolve, reject) => {
                            if (file.uploadedUrl) {
                              return resolve()
                            }
                            // fake request
                            setTimeout(() => {
                              if (i % 2) {
                                reject(new Error())
                              } else {
                                file.uploadedUrl = 'uploaded/url'
                                resolve()
                              }
                            }, 1000)
                          })
                        })).then(() => {
                          return true
                        })
                      }
                    },
                    messages: {
                      uploaded: '上传失败'
                    }
                  }
                ]
              },
              {
                fields: [
                  {
                    type: 'submit',
                    label: 'Submit'
                  },
                  {
                    type: 'reset',
                    label: 'Reset'
                  }
                ]
              }
            ]
          },
          options: { // 配置项
            scrollToInvalidField: true,
            layout: 'standard', // 左右结构
//            layout: 'classic' // 上下结构
          }
        },
        formConf2: {
          validity: {},
          valid: undefined,
          model: {
            inputValue: '',
            pcaValue: [],
            dateValue: ''
          },
          fields: [
            {
              type: 'input',
              modelKey: 'inputValue',
              label: 'Input',
              props: {
                placeholder: '请输入'
              },
              rules: {
                required: true
              }
            },
          ]
        }
      }
    },
    methods: {
      submitHandler (e) {
        e.preventDefault()
        console.log('submit', e)
      },
      validateHandler (result) {
        this.validity = result.validity
        this.valid = result.valid
        console.log(result)
        console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
      },
      resetHandler (e) {
        console.log('reset', e)
      },
      submitBySelf () {
        this.$refs.form.submit()
      },
      resetBySelf () {
        this.$refs.form.reset()
      },
      submitByAsyn () {
        this.$createToast({
          type: 'warn',
          time: 2000,
          txt: '正在请求后端验证'
        }).show()
        setTimeout(() => {
          /*模拟异步时间*/
          this.$refs.form.validate(() => {
            this.$createToast({
              type: 'correct',
              time: 2000,
              txt: '后端验证成功'
            }).show()
          })
        }, 2000)
      },
    },
    watch: {
      'switchConf.layout' (val, oldVal) {
        if (val) {
          this.formConf1.options.layout = 'classic'
        } else {
          this.formConf1.options.layout = 'standard'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .form {
    height 100%
    background-color $color-background
  }

  .form {
    .scroll-box {
      padding-bottom 20px
      .cube-form {
        background-color $color-highlight-background
        color $color-text
        .cube-form-group-legend {
          background-color $color-dialog-background
          color $color-theme
          font-size $font-size-medium
          letter-spacing 1px
        }
        .cube-input input {
          background-color $color-highlight-background
          border-radius 0
        }
      }
      .row {
        height 50px
        line-height 50px
        padding 10px
        margin-bottom 5px
        background-color $color-highlight-background
      }
      .btn-row {
        width calc(100% - 30px)
        padding 15px
        background-color $color-highlight-background
        button {
          padding 17px 16px
          margin 15px 0
        }
      }
    }
  }
</style>
