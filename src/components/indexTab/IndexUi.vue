<template>
  <div class="index-ui">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
                 ref="scrollUi"
    >
      <div class="scroll-box">
        <cell title="Button" desc="按钮，提供了各种类型、样子、状态以及图标" @click.native="jump('button')"></cell>
        <cell title="Loading" desc="加载，提供了可自定义大小的加载动画" @click.native="jump('loading')"></cell>
        <cell title="Tip" desc="提示，用于弹出提示气泡框" @click.native="jump('tip')"></cell>
        <cell title="Toolbar" desc="工具栏，可以组合多个按钮，复选框操作为一个工具栏" @click.native="jump('toolbar')"></cell>
        <cell title="Checkbox" desc="复选框，可设置其状态、传入特殊 class 以及复选框图标位置" @click.native="jump('checkbox')"></cell>
        <cell title="Radio" desc="单选框组，可设置单选框组内容，样式等" @click.native="jump('radio')"></cell>
        <cell title="Input" desc="输入框组件。支持使用v-model对数据双向绑定，支持一键清空内容" @click.native="jump('input')"></cell>
        <cell title="Textarea" desc="多行输入框组件，支持使用v-model对数据双向绑定，根据是否有内容、是否聚焦有折叠、展开两种状态"
              @click.native="jump('textarea')"></cell>
        <cell title="Select" desc="Select 组件，用于单项选择，依赖picker组件" @click.native="jump('select')"></cell>
        <cell title="Switch" desc="滑动开关，用于切换 on/off 状态" @click.native="jump('switch')"></cell>
        <cell title="Rate" desc="评分组件。你可以自定义星星个数，可以禁用交互，以用作评价展示，可以通过插槽自定义星星样式" @click.native="jump('rate')"></cell>
        <cell title="Validator" desc="校验器，用于对表单进行验证，并提示相应的错误信息" @click.native="jump('validator')"></cell>
        <cell title="Upload" desc="Upload 上传组件" @click.native="jump('upload')"></cell>
        <cell title="Form" desc="表单，包含各种输入组件以及对应的校验；我们可以通过数据驱动的方式来生成完成表单" @click.native="jump('form')"></cell>
        <cell title="Popup" desc="底层弹层组件，主要用于基于此组件实现上层组件封装，只提供了基础功能：指定类型、是否有背景层、显示内容（HTML）以及是否居中。
内置弹层类组件基本都是基于此组件实现，" @click.native="jump('popup')"></cell>
        <cell title="Toast" desc="组件主要用于非模态信息提醒，无需用户交互" @click.native="jump('toast')"></cell>
        <cell title="Picker" desc="Picker组件支持多列选择器及数据联动" @click.native="jump('picker')"></cell>
        <cell title="Dialog" desc="Dialog模态框组件，提供了多种样式及交互形式" @click.native="jump('dialog')"></cell>
        <cell title="ActionSheet" desc="操作列表提供了两种常见的样式，灵活可控内容" @click.native="jump('actionSheet')"></cell>
        <cell title="Drawer" desc="抽屉，主要用来需要大范围层级进行选择的场景，一般情况下应该是满屏状态" @click.native="jump('drawer')"></cell>
        <cell title="Scroll" desc="滚动列表，提供了优质的原生滚动体验，便捷的配置项和事件，是一个基于better-scroll进行封装的组件"></cell>
        <cell title="Slide" desc="轮播图，提供了常见的轮播及swipe的功能，也是一个基于better-scroll进行封装的组件"
              @click.native="jump('slide')"></cell>
        <cell title="IndexList" desc="索引列表，提供了列表索引的功能，也是一个基于better-scroll进行封装的组件"
              @click.native="jump('indexList')"></cell>
        <cell title="Swipe" desc="滑块组件，提供类似微信列表左滑功能，可以方便地对列表项做一些功能操作" @click.native="jump('swipe')"></cell>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import { webview } from 'assets/js/webview'
  import { indexMixin } from 'assets/js/mixins'
  import Cell from 'components/cell/Cell'
  import { fire } from "assets/js/utils"


  export default {
    mixins: [indexMixin],
    components: {
      Cell
    },
    methods: {
      plusReady () {
        this.resetScroll()
      },
      resetScroll () {
        let self = this
        window.addEventListener('resetScroll', function (event) {
          console.log('接收自定义事件-indexUi')
          self.$refs.scrollUi.scrollTo(0, 0, 200, 'bounce')
        })
      },
      jump (id) {
        webview.openView({
          url: `./ui/${id}.html`,
          id: id
        }, () => {
          if (id === 'button') {
            let targetPage = plus.webview.getWebviewById(id)
            let data = {
              a: 123,
              bottom: 456
            }
            console.log('执行发送自定义事件')
            fire(targetPage, 'buttonCustom', data)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .index-ui {
    height 100%
    .scroll-wrap {
      height 100%
    }
  }
</style>
