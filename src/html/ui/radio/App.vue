<template>
  <div class="radio">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-radio-group v-model="radioConf1.value" :options="radioConf1.options"/>
        </base-row>
        <base-row title="设置radio位置和禁用">
          <cube-radio-group v-model="radioConf2.value"
                            :options="radioConf2.options"
                            :position="radioConf2.position"
          />
          <div class="res">
            选中的值是：{{radioConf2.value}}
          </div>
        </base-row>
        <base-row title="水平排列与镂空">
          <cube-radio-group v-model="radioConf3.value"
                            :options="radioConf3.options"
                            :position="radioConf3.position"
                            :hollow-style="radioConf3.hollow"
                            :horizontal="radioConf3.horizontal"
          />
          <div class="res">
            选中的值是：{{radioConf3.value}}
          </div>
        </base-row>
        <base-row title="使用默认插槽">
          <cube-radio-group>
            <cube-radio
              v-for="(option, index) in radioConf4.options"
              :key="index"
              :option="option"
              v-model="radioConf4.value">
              <img :src="option.src"/>
            </cube-radio>
          </cube-radio-group>
          <div class="res">
            选中的值是：{{radioConf4.value}}
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
        radioConf1: {
          value: '',
          options: ['value1', 'value2']
        },
        radioConf2: {
          value: 2,
          position: 'right',
          options: [
            {
              label: 'value1',
              value: 1
            },
            {
              label: 'value2',
              value: 2
            },
            {
              label: 'value3',
              value: 3,
              disabled: true
            }
          ]
        },
        radioConf3: {
          value: 2,
          position: 'right',
          hollow: true,
          horizontal: true,
          options: [
            {
              label: '值1',
              value: 1
            },
            {
              label: '值2',
              value: 2
            },
            {
              label: '值2',
              value: 3,
            }
          ]
        },
        radioConf4: {
          value: 2,
          position: 'right',
          hollow: false,
          horizontal: false,
          options: [
            {
              label: 1,
              value: 1,
              src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516805611092&di=80d0f229dd999ffa3be79d6e317832b0&imgtype=0&src=http%3A%2F%2Fimglf0.ph.126.net%2F1EnYPI5Vzo2fCkyy2GsJKg%3D%3D%2F2829667940890114965.jpg'
            },
            {
              label: 2,
              value: 2,
              src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516805611092&di=80d0f229dd999ffa3be79d6e317832b0&imgtype=0&src=http%3A%2F%2Fimglf0.ph.126.net%2F1EnYPI5Vzo2fCkyy2GsJKg%3D%3D%2F2829667940890114965.jpg'
            },
            {
              label: 3,
              value: 3,
              src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516805611092&di=80d0f229dd999ffa3be79d6e317832b0&imgtype=0&src=http%3A%2F%2Fimglf0.ph.126.net%2F1EnYPI5Vzo2fCkyy2GsJKg%3D%3D%2F2829667940890114965.jpg',
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
  html, body, .radio {
    height 100%
    background-color $color-background
  }

  .radio {
    .scroll-box {
      padding-bottom 20px
      .cube-radio {
        img {
          width 80%
        }
        background-color $color-background-d
        .cube-radio-ui {
          width 24px
          height 24px
          margin-right 15px
        }
        .cube-radio-ui::before {
          position absolute
          left 4px
          top 4px
          transform scale(1.6)
        }
      }
      .res {
        height 50px
        line-height 50px
        text-align center
      }
    }
  }
</style>
