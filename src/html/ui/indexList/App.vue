<template>
  <div>
    <index-list v-if="indexListConf1.flag"
                :data="indexListConf1.data"
                :title="indexListConf1.title"
                @back="back"
                @select="select"
                class="index-list-pop"
    ></index-list>
    <index-list v-if="indexListConf2.flag"
                :data="indexListConf2.data"
                :title="indexListConf2.title"
                :custom="indexListConf2.custom"
                @back="back"
                @save="save"
                class="custom"
    >
      <cube-index-list-group
        v-for="(group, index) in indexListConf2.data"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
        >
          <cube-checkbox v-model="item.checked" :position="indexListConf2.position" class="custom-item">
            我是自定义 {{item.name}}
          </cube-checkbox>
        </cube-index-list-item>
      </cube-index-list-group>
    </index-list>
    <index-list v-if="indexListConf3.flag"
                :refs="indexListConf3.ref"
                :data="indexListConf3.data"
                :title="indexListConf3.title"
                :pullUpLoad="indexListConf3.pullUpLoad"
                @select="select"
                @title-click="clickTitle"
                @pulling-up="onPullingUp"
                @back="back"
    >
    </index-list>
    <index-list v-if="indexListConf4.flag"
                :refs="indexListConf4.ref"
                :data="indexListConf4.data"
                :title="indexListConf4.title"
                :pullDownRefresh="indexListConf4.pullDownRefresh"
                @select="select"
                @title-click="clickTitle"
                @pulling-down="onPullingDown"
                @back="back"
    >
    </index-list>
    <div class="index-list-wrap"
         v-show="!indexListConf1.flag && !indexListConf2.flag && !indexListConf3.flag && !indexListConf4.flag">
      <base-row title="基础使用">
        <cube-button @click="showIndexList('default')">default</cube-button>
      </base-row>
      <base-row title="自定义插槽">
        <cube-button @click="showIndexList('custom')">custom</cube-button>
      </base-row>
      <base-row title="上拉加载">
        <cube-button @click="showIndexList('up')">上拉加载</cube-button>
      </base-row>
      <base-row title="下拉刷新">
        <cube-button @click="showIndexList('down')">下拉刷新</cube-button>
      </base-row>
    </div>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import IndexList from 'components/indexList/IndexList'
  import { cityData } from 'static/mock/indexList'
  import { uniqueArr } from 'assets/js/utils'

  export default {
    mixins: [webviewMixin],
    components: {
      IndexList
    },
    data () {
      return {
        indexListConf1: {
          flag: false,
          title: '自定义标题',
          data: cityData
        },
        indexListConf2: {
          flag: false,
          title: '城市多选',
          data: cityData,
          custom: true,
          position: 'right'
        },
        indexListConf3: {
          flag: false,
          title: '上拉加载',
          data: cityData.slice(0, 4),
          pullUpLoad: true,
          ref: 'indexList3'
        },
        indexListConf4: {
          flag: false,
          title: '下拉刷新',
          data: cityData,
          ref: 'indexList4',
          pullDownRefresh: {
            stop: 55
          }
        }
      }
    },
    methods: {
      back () {
        this.indexListConf1.flag = false
        this.indexListConf2.flag = false
        this.indexListConf3.flag = false
        this.indexListConf4.flag = false
        console.log(this.indexListConf2.data)
      },
      save () {
        this.indexListConf1.flag = false
        this.indexListConf2.flag = false
        this.indexListConf3.flag = false
        this.indexListConf4.flag = false
        this.dealCheck()
      },
      showIndexList (status) {
        switch (status) {
          case 'default':
            this.indexListConf1.flag = true
            break
          case 'custom':
            this.indexListConf2.flag = true
            break
          case 'up':
            this.indexListConf3.flag = true
            break
          case 'down':
            this.indexListConf4.flag = true
            break
        }
      },
      dealCheck () {
        let resArr = []
        let retrunArr = []
        let dealArr = []
        let retStr = ''
        for (let i = 0, len1 = this.indexListConf2.data.length; i < len1; i++) {
          for (let j = 0, len2 = this.indexListConf2.data[i].items.length; j < len2; j++) {
            if (this.indexListConf2.data[i].items[j].checked) {
              console.log(1)
              resArr.push(this.indexListConf2.data[i].items[j])
            } else {
              console.log(this.indexListConf2.data[i].items[j].checked)
            }
          }
        }
        console.log(resArr)
        console.log(retrunArr)
        for (let i = 0, len = resArr.length; i < len; i++) {
          dealArr.push(resArr[i].name)
        }
        retrunArr = uniqueArr(dealArr)
        retStr = retrunArr.join(',')
        this.$createDialog({
          type: 'alert',
          title: '选择内容',
          content: `您选择了${retStr}`,
          icon: 'cubeic-alert'
        }).show()
      },
      select (item) {
        this.back()
        this.$createDialog({
          type: 'alert',
          title: '选择内容',
          content: `您选择了${item.name}`,
          icon: 'cubeic-alert'
        }).show()
      },
      clickTitle (title) {
        console.log(title)
      },
      onPullingUp (obj) {
        // Mock async load.
        let self = obj
        setTimeout(() => {
          const length = this.indexListConf3.data.length
          if (length < cityData.length) {
            // Update data.
            this.indexListConf3.data.push(cityData[length])
          }
          // Call forceUpdate after finishing data load.
          self.$refs[this.indexListConf3.ref].forceUpdate()
        }, 1000)
      },
      onPullingDown (obj) {
        let self = obj
        // Mock async load.
        setTimeout(() => {
          // Update data.
          this.indexListConf4.data[1].items.push(...cityData[1].items)
          // Call forceUpdate after finishing data load.
          self.$refs[this.indexListConf4.ref].forceUpdate()
          this.$createToast({
            time: 1000,
            txt: '刷新成功',
            mask: true,
            type: 'correct'
          }).show()
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .index-list-wrap {
    height 100%
    background-color $color-background
  }

  .index-list-pop {

  }

  .custom {
    // 自定义项的样式
    .custom-item {
      position: relative
      height: 70px
      line-height: 70px
      padding: 0 16px
      font-size: $fontsize-medium
    }
    // 用自定义样式，覆写内置的默认样式
    .cube-index-list-content {
      background-color: #222
      color: #909090
    }
    .cube-index-list-anchor {
      background-color: #333
      height: 30px
      line-height: 30px
      padding: 0 0 0 20px
    }
    .cube-index-list-nav {
      padding: 20px 0
      border-radius: 10px
      background: rgba(0, 0, 0, .3)
      > ul {
        > li {
          padding: 3px
          font-size: 12px
          color: #909090
          &.active {
            color: #ffcd32
          }
        }
      }
    }
  }
</style>
