<template>
  <div class="validator">
    <base-row title="基础示例" class="title">
      <cube-input v-model="validatorConf1.text" :placeholder="validatorConf1.selectConf.value"></cube-input>
      <cube-validator v-model="validatorConf1.valid"
                      :model="validatorConf1.text"
                      :rules="rules"
                      :immediate="validatorConf1.switchConf.immediate"
                      :disabled="validatorConf1.switchConf.disabled"
                      :messages="messages"
                      ref="validator1"
      >
      </cube-validator>
    </base-row>
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <div class="validator-box">
          <base-row title="rules配置项">
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.required">
                required
              </cube-switch>
            </div>
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.disabled">
                disabled
              </cube-switch>
            </div>
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.notWhitespace">
                不允许全是空白符
              </cube-switch>
            </div>
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.immediate">
                是否立即校验(需改代码生效)
              </cube-switch>
            </div>
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.customRule">
                自定义规则(详看代码)
              </cube-switch>
            </div>
            <div class="row">
              <cube-switch v-model="validatorConf1.switchConf.newType">
                添加新类型(详看代码)
              </cube-switch>
            </div>
            <div class="row flex-allCenter">
              <div class="flex-1">验证表单类型</div>
              <cube-select
                v-model="validatorConf1.selectConf.value"
                :options="validatorConf1.selectConf.options"
                :title="validatorConf1.selectConf.title"
                :placeholder="validatorConf1.selectConf.placeholder"
                :auto-pop="validatorConf1.switchConf.auto"
                :cancelTxt="validatorConf1.selectConf.cancelTxt"
                :confirmTxt="validatorConf1.selectConf.confirmTxt"
                class="flex-1"
              >
              </cube-select>
            </div>
            <div class="row flex-allCenter">
              <div class="flex-1">
                <cube-switch v-model="validatorConf1.switchConf.min">
                  最小值
                </cube-switch>
              </div>
              <cube-input v-model="validatorConf1.inputConf.inputConf1.value"
                          :placeholder="validatorConf1.inputConf.inputConf1.placeholder"
                          :disabled="!validatorConf1.switchConf.min"
                          class="flex-1"
              ></cube-input>
            </div>
            <div class="row flex-allCenter">
              <div class="flex-1">
                <cube-switch v-model="validatorConf1.switchConf.max">
                  最大值
                </cube-switch>
              </div>
              <cube-input v-model="validatorConf1.inputConf.inputConf2.value"
                          :placeholder="validatorConf1.inputConf.inputConf2.placeholder"
                          :disabled="!validatorConf1.switchConf.max"
                          class="flex-1"
              ></cube-input>
            </div>
            <div class="row flex-allCenter">
              <div class="flex-1">
                <cube-switch v-model="validatorConf1.switchConf.len">
                  限定len
                </cube-switch>
              </div>
              <cube-input v-model="validatorConf1.inputConf.inputConf3.value"
                          :placeholder="validatorConf1.inputConf.inputConf3.placeholder"
                          :disabled="!validatorConf1.switchConf.len"
                          class="flex-1"
              ></cube-input>
            </div>
            <div class="row flex-allCenter">
              <div class="flex-1">
                <cube-switch v-model="validatorConf1.switchConf.reg">
                  开启正则
                </cube-switch>
              </div>
              <cube-input v-model="validatorConf1.inputConf.inputConf4.value"
                          :placeholder="validatorConf1.inputConf.inputConf4.placeholder"
                          :disabled="!validatorConf1.switchConf.reg"
                          class="flex-1"
              ></cube-input>
            </div>
          </base-row>
        </div>
        <div class="validator-box">
          <base-row title="自定义提示插槽">
            <cube-validator v-model="validatorConf2.valid" :model="validatorConf2.text" :rules="validatorConf2.rules"
                            :messages="validatorConf2.messages">
              <cube-input v-model="validatorConf2.text" placeholder="component name"></cube-input>
              <div slot="message" class="custom-msg" slot-scope="props">
                <div v-show="(props.dirty || props.validated) && !validatorConf2.valid">
                  <i class="cubeic-warn" style="color: orangered"></i> {{ props.message }}
                </div>
              </div>
            </cube-validator>
          </base-row>
        </div>
        <div class="validator-box">
          <base-row title="异步校验">
            <div class="validator-item">
              <cube-validator
                v-model="validatorConf3.valid"
                :model="validatorConf3.captcha"
                :rules="validatorConf3.rules"
                :messages="validatorConf3.messages"
                :immediate="validatorConf3.immediate"
                @validating="validatingHandler"
                @validated="validatedHandler">
                <cube-input v-model="validatorConf3.captcha" placeholder="Please input captcha"></cube-input>
              </cube-validator>
            </div>
          </base-row>
        </div>
        <div class="validator-box">
          <cube-button @click="submit1">提交</cube-button>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { Validator } from 'cube-ui'

  /*自定义规则*/
  Validator.addRule('odd', (val, config, type) => !config || Number(val) % 2 === 1)
  Validator.addMessage('odd', '请填写基数')

  /*添加新类型*/
  Validator.addType('yourType', (val) => {
    return typeof val === 'string' && /^([0-9]|(1[0-5]))$/.test(val)
  })
  // Validator.addMessage('newMsg', '必填')

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        validatorConf1: {
          text: '',
          valid: undefined,
          switchConf: {
            required: true,
            notWhitespace: false,
            min: false,
            max: false,
            len: false,
            reg: false, // 是否启动正则
            immediate: false, // 是否立即校验
            disabled: false,
            customRule: false, // 是否开启自定义规则
            newType: false, // 添加新类型
          },
          inputConf: {
            inputConf1: {
              value: '',
              placeholder: '选择最小值',
            },
            inputConf2: {
              value: '',
              placeholder: '选择最大值',
            },
            inputConf3: {
              value: '',
              placeholder: '选择长度',
            },
            inputConf4: {
              value: '/ljc.com$/',
              placeholder: '正则表达式',
            },
          },
          selectConf: {
            options: [
              {
                value: 'string',
                text: 'string'
              },
              {
                value: 'number',
                text: 'number'
              }, {
                value: 'array',
                text: 'array'
              }, {
                value: 'date',
                text: 'date'
              },
              {
                value: 'email',
                text: 'email'
              },
              {
                value: 'tel',
                text: 'tel'
              },
              {
                value: 'url',
                text: 'url'
              }
            ],
            value: 'string',
            title: '请选表单类型',
            placeholder: '请选择',
            cancelTxt: '返回',
            confirmTxt: '选择'
          },
        },
        validatorConf2: {
          valid: undefined,
          text: '',
          rules: {
            type: 'string',
            pattern: /^cube-/,
            min: 8,
            max: 10
          },
          messages: {
            pattern: '必须以"cube-"开头'
          },
        },
        validatorConf3: {
          valid: undefined,
          captcha: '',
          rules: {
            type: 'number',
            required: true,
            len: 6,
            captchaCheck: (val) => {
              return (resolve) => {
                setTimeout(() => {
                  resolve(val === '123456')
                }, 1000)
              }
//              return new Promise((resolve) => {
//                setTimeout(() => {
//                  resolve(val === '123456')
//                }, 1000)
//              })
            }
          },
          messages: {
            captchaCheck: '必须要等于123456',
            len: '长度必须为6'
          }
        }
      }
    },
    computed: {
      rules () {
        let rules = null
        rules = {
          required: this.validatorConf1.switchConf.required,
          type: this.validatorConf1.selectConf.value
        }
        if (this.validatorConf1.switchConf.notWhitespace) {
          rules.notWhitespace = this.validatorConf1.switchConf.notWhitespace
        }
        if (this.validatorConf1.switchConf.min && this.validatorConf1.inputConf.inputConf1.value) {
          rules.min = this.validatorConf1.inputConf.inputConf1.value
        }
        if (this.validatorConf1.switchConf.max && this.validatorConf1.inputConf.inputConf2.value) {
          rules.max = this.validatorConf1.inputConf.inputConf2.value
        }
        if (this.validatorConf1.switchConf.len && this.validatorConf1.inputConf.inputConf3.value) {
          rules.len = Number(this.validatorConf1.inputConf.inputConf3.value)
        }
        if (this.validatorConf1.switchConf.reg && this.validatorConf1.inputConf.inputConf4.value) {
          rules.pattern = eval(this.validatorConf1.inputConf.inputConf4.value)
        }
        if (this.validatorConf1.switchConf.customRule) {
          rules.odd = true
        }
        console.log(rules)
        return rules
      },
      messages () {
        let messages = null
        messages = {
          pattern: `不符合正则${this.validatorConf1.inputConf.inputConf4.value}规则`,
          custom: `不符合自定义规则`,
//          type: {
//            yourType: '0-15之间的数字'
//          },
          type: '0-15之间的数字'
        }
        return messages
      }
    },
    methods: {
      submit1 () {
        const p1 = this.$refs.validator1.validate()
        console.log(p1)
        console.log(this.rules)
      },
      validatingHandler () {
        console.log('validating')
      },
      validatedHandler () {
        console.log('validated')
      }
    },
    watch: {
      'validatorConf1.switchConf': {
        deep: true,
        handler (val, oldVal) {
          this.$nextTick(() => {
            this.submit1()
          })
          if (val.newType) { // 有新类型
            this.validatorConf1.selectConf.options.push({
              value: 'yourType',
              text: '自定义类型'
            })
          } else {
            let index = 0
            index = this.validatorConf1.selectConf.options.findIndex((value) => {
              return value.value === 'yourType'
            })
            console.log('index ' + index)
            this.validatorConf1.selectConf.options = this.validatorConf1.selectConf.options.slice(0, index)
          }
        }
      },
      'validatorConf1.inputConf': {
        deep: true,
        handler (val, oldVal) {
          this.$nextTick(() => {
            this.submit1()
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/flex.styl"
  html, body, .validator {
    height 100%
    background-color $color-background
  }

  .cube-validator .cube-input input {
    color $color-background!important
  }

  .validator {
    .title {
      z-index 9999999
      position fixed
      top 0px
      left 0px
      height 110px
      background-color $color-background
      .cube-validator-msg {
        line-height 30px
      }
    }
    .cube-scroll-wrapper {
      position relative
      top 130px
      height: calc(100% - 140px)
    }
    .scroll-box {
      .validator-box {
        &:last-child {
        }
        .row {
          height 50px
          line-height 50px
          padding 10px
          margin-bottom 5px
          background-color $color-highlight-background
          .choose {
            background-color $color-text
            color $color-background
          }
        }
        .cube-validator {
          min-height 30px
          line-height 30px
        }
        button {
          margin 10px 0
        }
      }
    }
  }
</style>
