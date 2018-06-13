<template>
  <div class="picker">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-button @click="showPicker1">普通示例</cube-button>
          <cube-button @click="showPicker2">多列示例</cube-button>
          <cube-button @click="showPicker3">配置别名</cube-button>
          <cube-button @click="showPicker4">setData创建数据</cube-button>
          <cube-button @click="showPicker5">带有副标题</cube-button>
          <cube-button @click="showPicker6">参数与事件</cube-button>
        </base-row>
        <base-row title="CascadePicker组件多级联动">
          <cube-button @click="showCascadePicker1">普通示例</cube-button>
          <cube-button @click="showCascadePicker2">Set Data</cube-button>
          <cube-button @click="showCascadePicker3">异步数据加载</cube-button>
        </base-row>
        <base-row title="DatePicker日期组件">
          <cube-button @click="showDatePicker1">普通示例</cube-button>
          <cube-button @click="showDatePicker2">时分秒</cube-button>
          <cube-button @click="showDatePicker3">全6列</cube-button>
          <cube-button @click="showDatePicker4">format内容格式</cube-button>
          <cube-button @click="showDatePicker5">$updateProps更新</cube-button>
        </base-row>
        <base-row title="TimePicker组件">
          <cube-button @click="showTimePicker1">普通示例</cube-button>
          <cube-button @click="showTimePicker2">日期选项配置</cube-button>
          <cube-button @click="showTimePicker3">手动设置显示时间</cube-button>
        </base-row>
        <base-row title="SegmentPicker多段组件">
          <cube-button @click="showSegmentPicker1">普通示例</cube-button>
          <cube-button @click="showSegmentPicker2">三级from-to</cube-button>
        </base-row>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import { webviewMixin } from 'assets/js/mixins'
  import BaseRow from "../../../components/baseRow/BaseRow";

  const pickerDate1 = [
    {text: '剧毒', value: '剧毒'}, {text: '蚂蚁', value: '蚂蚁'}, {text: '幽鬼', value: '幽鬼'}
  ]
  const pickerDate2 = [
    {text: '输出', value: '输出'}, {text: '控制', value: '控制'},
    {text: '核心', value: '核心'}, {text: '爆发', value: '爆发'}, {text: '辅助', value: '辅助'},
    {text: '打野', value: '打野'}, {text: '逃生', value: '逃生'}, {text: '先手', value: '先手'}
  ]
  const pickerDate3 = [
    {text: '梅肯', value: '梅肯'}, {text: '秘法鞋', value: '秘法鞋'},
    {text: '假腿', value: '假腿'}, {text: '飞鞋', value: '飞鞋'}, {text: '辉耀', value: '辉耀'},
    {text: '金箍棒', value: '金箍棒'}
  ]
  const pickerDate4 = [
    {id: '1', name: '剧毒'}, {id: '2', name: '蚂蚁'}, {id: '3', name: '幽鬼'}
  ]
  const cascadeData1 = [
    {
      value: '1',
      text: '四川省',
      children: [
        {
          value: '2',
          text: '成都市',
          children: [{value: '3', text: '高新区'}, {value: '4', text: '天府新区'}]
        },
        {
          value: '5',
          text: '雅安市',
          children: [{value: '6', text: '雨城区'}, {value: '7', text: '名山'}]
        }
      ]
    },
    {
      value: '8',
      text: '北京',
      children: [
        {
          value: '9',
          text: '北京市',
          children: [{value: '10', text: '市辖区'}, {value: '11', text: '朝阳区'}]
        }
      ]
    }
  ]
  const cascadeData2 = [
    {
      value: 'Fruit',
      text: 'Fruit',
      children: [
        {
          value: 'Apple',
          text: 'Apple',
          children: [{value: 1, text: 'One'}, {value: 2, text: 'Two'}]
        },
        {
          value: 'Orange',
          text: 'Orange',
          children: [{value: 3, text: 'Three'}, {value: 4, text: 'Four'}]
        }
      ]
    },
    {
      value: 'Drink',
      text: 'Drink',
      children: [
        {
          value: 'Coffee',
          text: 'Coffee',
          children: [{value: 1, text: 'One'}, {value: 2, text: 'Two'}]
        },
        {
          value: 'Tea',
          text: 'Tea',
          children: [{value: 1, text: 'One'}, {value: 3, text: 'Three'}]
        }
      ]
    }
  ]

  const provinceList = [
    {
      value: '0',
      text: '北京'
    },
    {
      value: '1',
      text: '四川省'
    }
  ]
  const cityList = [
    [
      {
        value: '0',
        text: '北京市'
      }
    ],
    [
      {
        value: '1',
        text: '成都市'
      },
      {
        value: '2',
        text: '雅安市'
      },
    ]
  ]
  const areaList = [
    [
      {
        value: '005',
        text: '市辖区'
      },
      {
        value: '006',
        text: '朝阳区'
      }
    ],
    [
      {
        value: '001',
        text: '高新区'
      },
      {
        value: '002',
        text: '天府新区'
      },
    ],
    [
      {
        value: '003',
        text: '雨城区'
      },
      {
        value: '004',
        text: '名山'
      }
    ]
  ]

  const asyncData = provinceList
  const asyncSelectedIndex = [0, 0, 0]
  asyncData[0].children = cityList[asyncData[0].value]
  asyncData[0].children[0].children = areaList[asyncData[0].children[0].value]

  const dateSegmentData1 = [
    {
      is: 'cube-date-picker',
      title: '入学时间',
      min: new Date(2000, 0, 1),
      max: new Date(2030, 11, 31)
    },
    {
      is: 'cube-date-picker',
      title: '毕业时间',
      min: new Date(2000, 0, 1),
      max: new Date(2030, 11, 31)
    }
  ]

  const expressData = [
    {text: '中通', value: '中通'}, {text: '圆通', value: '圆通'}, {text: '顺丰', value: '顺丰'}
  ]

  let cityData = []
  let cityData_c = []
  let cityData_c_c = []
  cityData = JSON.parse(JSON.stringify(provinceList))
  cityData.forEach(province => {
    province.children = JSON.parse(JSON.stringify(cityList[province.value]))
    province.children.forEach(city => {
      city.children = JSON.parse(JSON.stringify(areaList[city.value]))
    })
  })
  console.log(cityData);
  console.log(asyncData);

  export default {
    components: {BaseRow},
    mixins: [webviewMixin],
    data () {
      return {
        picker1: null,
        picler2: null,
        picker3: null,
        picker4: null,
        picker5: null,
        picker6: null,
        cascadePicker1: null,
        cascadePicker2: null,
        cascadePicker3: null,
        datePicker1: null,
        datePicker2: null,
        datePicker3: null,
        datePicker4: null,
        datePicker5: null,
        dateSegmentPicker1: null,
        citySegmentPicker2: null,
        toast: null
      }
    },
    mounted () {
      this.initPicker1()
      this.initPicker2()
      this.initPicker3()
      this.initPicker4()
      this.initPicker5()
      this.initPicker6()
      this.initCascadePicker1()
      this.initCascadePicker2()
      this.initCascadePicker3()
      this.initSegmentPicker1()
      this.initSegmentPicker2()
    },
    methods: {
      onSelect (selectedVal, selectedIndex, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/>
            - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onSelectDate (date, selectedVal, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onSelectTime (selectedTime, selectedText) {
        this.$createDialog({
          type: 'warn',
          title: `选中的时间戳是 ${selectedTime}`,
          content: `选中的内容是 ${selectedText}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onSelectSegment1 (selectedDates, selectedVals, selectedTexts) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Items: <br/> - 入学时间: ${selectedTexts[0].join('')} <br/> - 毕业时间: ${selectedTexts[1].join('')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onSelectSegment2 (selectedDates, selectedVals, selectedTexts) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Items: <br/> - 所选快递:  ${selectedTexts[0].join('')} <br/> - 寄件地址: ${selectedTexts[1].join('')} <br/> - 收件地址: ${selectedTexts[2].join('')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onCancel () {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      },
      initPicker1 () {
        this.picker1 = this.$createPicker({
          title: '野怪',
          data: [pickerDate1],
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initPicker2 () {
        this.picker2 = this.$createPicker({
          title: '贪玩蓝月',
          data: [pickerDate1, pickerDate2, pickerDate3],
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initPicker3 () {
        this.picker3 = this.$createPicker({
          title: '使用别名',
          data: [pickerDate4],
          alias: {
            value: 'id',
            text: 'name'
          },
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initPicker4 () {
        this.picker4 = this.$createPicker({
          title: '使用SetData',
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initPicker5 () {
        this.picker5 = this.$createPicker({
          title: 'Picker',
          subtitle: '副标题',
          data: [pickerDate1],
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initPicker6 () {
        this.picker6 = this.$createPicker({
          title: '参数与事件',
          cancelTxt: '返回',
          confirmTxt: '选择',
          swipeTime: 2500,
          visible: false,
          data: [pickerDate1],
          onSelect: this.onSelect,
          onCancel: this.onCancel,
          onChange (index, selectedIndex) {
            console.log(index, selectedIndex)
          },
          onValueChange (selectedVal, selectedIndex, selectedText) {
            console.log(selectedVal, selectedIndex, selectedText)
          }
        })
      },
      initCascadePicker1 () {
        this.cascadePicker1 = this.$createCascadePicker({
          title: '多级联动',
          data: cascadeData1,
          selectedIndex: [0, 0, 0],
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initCascadePicker2 () {
        this.cascadePicker2 = this.$createCascadePicker({
          title: 'Set Data',
          onSelect: this.onSelect,
          onCancel: this.onCancel
        })
      },
      initCascadePicker3 () {
        this.cascadePicker3 = this.$createCascadePicker({
          title: '异步加载',
          async: true,
          data: asyncData,
          selectedIndex: asyncSelectedIndex.slice(),
          onSelect: this.onSelect,
          onCancel: this.onCancel,
          onChange: this.asyncChangeHandle1,
        })
      },
      initSegmentPicker1 () {
        this.dateSegmentPicker1 = this.$createSegmentPicker({
          data: dateSegmentData1,
          onSelect: this.onSelectSegment1,
          onCancel: this.onCancel,
          onNext: (i, selectedDate, selectedValue, selectedText) => { // 处理联动数据
            console.log(i)
            console.log(selectedDate)
            console.log(selectedValue)
            console.log(selectedText)
            dateSegmentData1[1].min = selectedDate
            if (i === 0) {
              this.dateSegmentPicker1.$updateProps({
                data: dateSegmentData1
              })
            }
          }
        })
      },
      initSegmentPicker2 () {
        this.dateSegmentPicker2 = this.$createSegmentPicker({
          data: [{
            title: '选择快递',
            data: [expressData],
            selectedIndex: [1]
          }, {
            is: 'cube-cascade-picker',
            title: '寄件地址',
            data: cityData,
            selectedIndex: [0, 0, 0],
            cancelTxt: '返回'
          }, {
            is: 'cube-cascade-picker',
            title: '收件地址',
            data: cityData,
            selectedIndex: [0, 0, 0]
          }],
          cancelTxt: 'Cancel',
          confirmTxt: 'Confirm',
          nextTxt: 'Next',
          prevTxt: 'Prev',
          onSelect: this.onSelectSegment2,
          onChange: this.asyncChangeHandle2,
          onCancel: this.onCancel,
        })
      },
      showPicker1 () {
        this.picker1.show()
      },
      showPicker2 () {
        this.picker2.show()
      },
      showPicker3 () {
        this.picker3.show()
      },
      showPicker4 () {
        this.picker4.setData([pickerDate1, pickerDate2, pickerDate3], [1, 0, 1])
        this.picker4.show()
      },
      showPicker5 () {
        this.picker5.show()
      },
      showPicker6 () {
        this.picker6.show()
      },
      showCascadePicker1 () {
        this.cascadePicker1.show()
      },
      showCascadePicker2 () {
        this.cascadePicker2.setData(cascadeData2)
        this.cascadePicker2.show()
        setTimeout(() => {
          // setData when the picker is visible.
          this.cascadePicker2.setData(cascadeData2, [1, 1, 0])
        }, 1000)
      },
      showCascadePicker3 () {
        this.loading()
        setTimeout(() => { // 模拟获取首次数据时间
          this.cascadePicker3.show()
        }, 1000)
      },
      showDatePicker1 () {
        if (!this.datePicker1) {
          this.datePicker1 = this.$createDatePicker({
            title: 'Date Picker',
            min: new Date(2008, 7, 8),
            max: new Date(2025, 9, 20),
            value: new Date(),
            onSelect: this.onSelectDate,
            onCancel: this.onCancel
          })
        }
        this.datePicker1.show()
      },
      showDatePicker2 () {
        if (!this.datePicker2) {
          this.datePicker2 = this.$createDatePicker({
            title: 'Time Picker',
            min: [8, 0, 0],
            max: [20, 59, 59],
            value: new Date(),
            startColumn: 'hour',
            onSelect: this.onSelectDate,
            onCancel: this.onCancel
          })
        }
        this.datePicker2.show()
      },
      showDatePicker3 () {
        if (!this.datePicker3) {
          this.datePicker3 = this.$createDatePicker({
            title: 'Date Time Picker',
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2025, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.onSelectDate,
            onCancel: this.onCancel
          })
        }
        this.datePicker3.show()
      },
      showDatePicker4 () {
        if (!this.datePicker4) {
          this.datePicker4 = this.$createDatePicker({
            title: 'Use format',
            min: new Date(2008, 7, 8),
            max: new Date(2020, 9, 20),
            value: new Date(),
            format: {
              year: 'YY年',
              month: 'MM月',
              date: '第 D 日'
            },
            onSelect: this.onSelectDate,
            onCancel: this.onCancel
          })
        }
        this.datePicker4.show()
      },
      showDatePicker5 () {
        if (!this.datePicker5) {
          this.datePicker5 = this.$createDatePicker({
            title: 'Use $updateProps',
            min: new Date(2008, 7, 8),
            max: new Date(2020, 9, 20),
            value: new Date(),
            format: {
              year: 'YY年',
              month: 'MM月',
              date: '第 D 日'
            },
            onSelect: this.onSelectDate,
            onCancel: this.onCancel
          })
          this.datePicker5.show()
          setTimeout(() => {
            this.datePicker5.$updateProps({
              title: '更新过后',
              value: new Date(2010, 9, 1)
            })
          }, 1000)
        }
        this.datePicker5.show()
      },
      showTimePicker1 () {
        this.$createTimePicker({
          showNow: true,
          minuteStep: 5,
          delay: 15,
          onSelect: this.onSelectTime,
          onCancel: this.onCancel
        }).show()
      },
      showTimePicker2 () {
        this.$createTimePicker({
          showNow: true,
          minuteStep: 10,
          delay: 10,
          day: {
            len: 5,
            filter: ['今天', '明天'],
            format: 'M月d日'
          },
          onSelect: this.onSelectTime,
          onCancel: this.onCancel
        }).show()
      },
      showTimePicker3 () {
        const time = new Date().valueOf() + 1 * 60 * 60 * 1000
        const timePicker = this.$createTimePicker({
          showNow: true,
          minuteStep: 10,
          delay: 15,
          day: {
            len: 5,
            filter: ['今天', '明天', '后天'],
            format: 'M月d日'
          },
          onSelect: this.onSelectTime,
          onCancel: this.onCancel
        })
        timePicker.show()
        setTimeout(() => {
          timePicker.setTime(time)
        }, 1000)
      },
      showSegmentPicker1 () {
        this.dateSegmentPicker1.show()
      },
      showSegmentPicker2 () {
        this.dateSegmentPicker2.show()
      },
      asyncChangeHandle1 (i, newIndex) {
        console.log('i ' + i)
        console.log('newIndex ' + newIndex)
        if (newIndex !== asyncSelectedIndex[i]) {
          asyncSelectedIndex[i] = newIndex
          if (i < 2) {
            // 没有子内容模拟显示加载中状态
            if (i === 0 && !asyncData[newIndex].children) {
              console.log(1112)
              this.loading()
              setTimeout(() => {
                this.dealAsyncData(i, newIndex)
              }, 1000)
            } else if (i === 1 && !asyncData[asyncSelectedIndex[0]].children[newIndex].children) {
              console.log(1111)
              this.loading()
              setTimeout(() => {
                this.dealAsyncData(i, newIndex)
              }, 1000)
            } else {
              console.log(222)
              console.log(asyncData[asyncSelectedIndex[0]].children[newIndex].children)
              this.dealAsyncData(i, newIndex)
            }
          }
        }
      },
      asyncChangeHandle2 (pickerIndex, i, selectedIndex) {
        console.log('pickerIndex ' + pickerIndex)
        console.log('i ' + i)
        console.log('selectedIndex ' + selectedIndex)
      },
      dealAsyncData (i, newIndex) {
        if (i === 0) {
          const current = asyncData[newIndex]
          current.children = current.children || cityList[current.value]
          current.children[0].children = current.children[0].children || areaList[current.children[0].value]
          asyncSelectedIndex[1] = 0
          asyncSelectedIndex[2] = 0
        }
        if (i === 1) {
          const current = asyncData[asyncSelectedIndex[0]].children[newIndex]
          current.children = current.children || areaList[current.value]
          asyncSelectedIndex[2] = 0
        }
        this.cascadePicker3.setData(asyncData, asyncSelectedIndex)
        this.toast && this.toast.hide()
        console.log(asyncData)
        console.log(asyncSelectedIndex)
      },
      loading () {
        this.$createToast({
          time: 1000,
          txt: '数据获取中',
          mask: true,
          type: 'loading'
        }).show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  html, body, .picker {
    height 100%
    background-color $color-background
  }

  .cube-picker-confirm, .cube-picker-cancel {
    flex 0 0 61px !important
  }

  .picker {
    .scroll-box {
      padding-bottom 20px
      button {
        margin 10px 0
      }
    }
  }
</style>
