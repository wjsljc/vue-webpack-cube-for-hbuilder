<template>
  <div class="drawer">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="showDrawer1">Show Drawer</cube-button>
        </base-row>
        <base-row title="自定义使用">
          <cube-button @click="showDrawer2">Show Drawer</cube-button>
        </base-row>
      </div>
    </cube-scroll>
    <cube-drawer
      ref="drawer1"
      title="请选择"
      :data="data1"
      :selected-index="selectedIndex1"
      @change="changeHandler1"
      @select="selectHandler1"
      @cancel="cancelHandler"
    >
    </cube-drawer>
    <cube-drawer
      ref="drawer2"
      :data="data2"
      :selected-index="selectedIndex2"
      @change="changeHandler2"
      @select="selectHandler2"
      @cancel="cancelHandler">
      <span slot="title">{{province.text}}</span>
      <cube-drawer-panel
        v-for="(panel, index) in data2"
        :key="index"
        :index="index"
        :data="panel"
      >
        <cube-drawer-item v-for="(item, i) in panel" :item="item" :key="i" :index="i">
          <i class="cubeic-round-border"></i>
          <span>{{item.text}}</span>
        </cube-drawer-item>
      </cube-drawer-panel>
    </cube-drawer>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import { provinceList, cityList, areaList } from 'static/mock/city'

  export default {
    mixins: [webviewMixin],
    data () {
      return {
        province: {},
        selectedIndex1: [],
        selectedIndex2: [],
        data1: [
          provinceList,
          [],
          []
        ],
        data2: [
          provinceList,
          [],
          []
        ]
      }
    },
    methods: {
      showDrawer1 () {
        this.$refs.drawer1.show()
      },
      showDrawer2 () {
        // get radom province
        const randomIndex = Math.floor(Math.random() * provinceList.length)
        console.log(randomIndex)
        const randomProvince = provinceList[randomIndex]
        console.log(randomProvince)
        this.province = randomProvince
        this.$refs.drawer2.refill(0, cityList[randomProvince.value])
        this.$refs.drawer2.show()
      },
      changeHandler1 (index, item, selectedVal, selectedIndex1, selectedText) {
        console.log(index, item, selectedVal, selectedIndex1, selectedText)
        // fake request
        setTimeout(() => {
          let data
          if (index === 0) {
            // procince change, get city data
            data = cityList[item.value]
          } else {
            // city change, get area data
            data = areaList[item.value]
          }
          // refill panel(index + 1) data
          this.$refs.drawer1.refill(index + 1, data)
        }, 200)
      },
      changeHandler2 (index, item, selectedVal, selectedIndex, selectedText) {
        setTimeout(() => {
          // city change, get area data
          let data = areaList[item.value]
          this.$refs.drawer2.refill(index + 1, data)
        }, 200)
      },
      selectHandler1 (selectedVal, selectedIndex1, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex1.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      selectHandler2 (selectedVal, selectedIndex, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex2.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      cancelHandler () {
        console.log('cancel')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .drawer {
    height 100%
    background-color $color-background
  }

  .drawer {
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    .scroll-box {
      padding-bottom 20px
    }
  }
</style>
