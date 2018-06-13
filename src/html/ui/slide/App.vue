<template>
  <div class="slide">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用" class="base">
          <cube-slide :data="slideConf1.items"/>
        </base-row>
        <base-row title="自定义slot" class="custom">
          <cube-slide ref="slide"
                      :data="slideConf1.items"
                      @change="changePage"
                      :options="slideConf3.options"
          >
            <cube-slide-item v-for="(item, index) in slideConf1.items"
                             :key="index"
                             @click.native="clickHandler(item, index)"
            >
              <!--<a :href="item.url">-->
              <img :src="item.image">
              <!--</a>-->
            </cube-slide-item>
          </cube-slide>
        </base-row>
        <base-row title="配置项">
          <cube-slide :data="slideConf1.items"
                      :initial-index="slideConf3.index"
                      :loop="slideConf3.loop"
                      :auto-play="slideConf3.auto"
                      :interval="slideConf3.interval"
                      :threshold="slideConf3.threshold"
                      :speed="slideConf3.speed"
                      :allow-vertical="slideConf3.vertical"
                      :options="slideConf3.options"
          >
            <template slot="dots" slot-scope="props">
              <span class="my-dot" :class="{active: props.current === index}"
                    v-for="(item, index) in props.dots">{{index + 1}}</span>
            </template>
          </cube-slide>
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
        slideConf1: {
          items: [
            {
//              url: 'http://www.didichuxing.com/',
              image: 'http://webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
            },
            {
//              url: 'http://www.didichuxing.com/',
              image: 'http://webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
            },
            {
//              url: 'http://www.didichuxing.com/',
              image: 'http://webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
            }
          ]
        },
        slideConf3: {
          index: 1, // 初始索引
          loop: true, // 是否循环
          auto: false, // 是否自动播放
          interval: 4000, // 自动播放时间间隔
          threshold: 0.4, // 切换页面弹性临界值
          speed: 400, // 切换速度
          vertical: false, // 是否允许纵向滚动
          options: { // 配置项
            stopPropagation: true, // 阻止冒泡
          }
        }
      }
    },
    methods: {
      changePage (current) {
        console.log('当前轮播图序号为:' + current)
      },
      clickHandler (item, index) {
        console.log(item)
        console.log(index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .slide {
    height 100%
    background-color $color-background
  }

  .slide {
    .scroll-box {
      padding-bottom 20px
      img {
        width 100%
        height 120px
      }
    }
  }
</style>
