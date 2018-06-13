<template>
  <div class="loading">
    <cube-scroll :options="scrollConf.options"
                 class="scroll-wrap"
    >
      <div class="scroll-box">
        <base-row title="基础使用">
          <cube-swipe
            @item-click="onItemClick"
            @btn-click="onBtnClick1"
            :data="swipeConf1.swipeData">
          </cube-swipe>
        </base-row>
        <base-row title="自定义">
          <cube-swipe>
            <transition-group name="swipe" tag="ul">
              <li class="swipe-item-wrapper" v-for="(data,index) in swipeConf2.swipeData" :key="data.item.id">
                <cube-swipe-item
                  ref="swipeItem"
                  :btns="data.btns"
                  :index="index"
                  @btn-click="onBtnClick2"
                  @active="onItemActive">
                  <div @click="onItemClick(data.item, index)" class="item-inner flex-row">
                    <div class="icon flex-1">
                      <img :src="data.item.imgurl">
                    </div>
                    <div class="text flex-3">
                      <h2 class="item-name" v-html="data.item.name"></h2>
                      <p class="item-desc" v-html="data.item.desc"></p>
                    </div>
                  </div>
                </cube-swipe-item>
              </li>
            </transition-group>
          </cube-swipe>
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
        swipeConf1: {
          swipeData: [{
            item: {
              text: '测试1',
              value: 1
            },
            btns: [
              {
                action: 'clear',
                text: '不再关注',
                color: '#c8c7cd'
              },
              {
                action: 'delete',
                text: '删除',
                color: '#ff3a32'
              }
            ]
          }, {
            item: {
              text: '测试2',
              value: 2
            },
            btns: [
              {
                action: 'clear',
                text: '不再关注',
                color: '#c8c7cd'
              },
              {
                action: 'delete',
                text: '删除',
                color: '#ff3a32'
              }
            ]
          }, {
            item: {
              text: '测试3',
              value: 3
            },
            btns: [
              {
                action: 'clear',
                text: '不再关注',
                color: '#c8c7cd'
              },
              {
                action: 'delete',
                text: '删除',
                color: '#ff3a32'
              }
            ]
          }]
        },
        swipeConf2: {
          activeIndex: -1,
          swipeData: [
            {
              item: {
                id: '3646653877',
                name: '还不是因为你长得不好看',
                desc: '伤感：歌词再狠，也抵不过现实伤人',
                imgurl: 'http://p.qpic.cn/music_cover/MhQ4bJBPt3Yt5icXyBGNhyPJnE9O51CqaN72iaDgvFmDKaia12UFhU5uQ/600?n=1'
              },
              btns: [
                {
                  action: 'clear',
                  text: '不再关注',
                  color: '#c8c7cd'
                },
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ]
            },
            {
              item: {
                id: '1789676645',
                name: '秋水浮萍任飘渺',
                desc: '『武侠配乐』快意恩仇江湖情',
                imgurl: 'http://p.qpic.cn/music_cover/8KfvDey9cibtZ5xkWxRic6vhXgdPic3wnB7reibI4pdPQBCP8u57uqcjsQ/600?n=1'
              },
              btns: [
                {
                  action: 'clear',
                  text: '不再关注',
                  color: '#c8c7cd'
                },
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ]
            },
            {
              item: {
                id: '3649034125',
                name: '念葳蕊',
                desc: '江海迦：热恋后哼一首歌为自己悲悯的歌',
                imgurl: 'http://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbAoHG2fqqnrJVnGV4iaLCapWUpCKqbmAicJg/600?n=1'
              },
              btns: [
                {
                  action: 'clear',
                  text: '不再关注',
                  color: '#c8c7cd'
                },
                {
                  action: 'delete',
                  text: '删除',
                  color: '#ff3a32'
                }
              ]
            },
          ]
        }
      }
    },
    methods: {
      onItemClick (item) {
        console.log('click item:', item)
      },
      onBtnClick1 (btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.swipeConf1.swipeData.splice(index, 1)
            }
          }).show()
        }
      },
      onBtnClick2 (btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.swipeConf2.swipeData.splice(index, 1)
            }
          }).show()
        } else {
          this.$refs.swipeItem[index].shrink()
        }
      },
      onItemActive (index) {
        if (index === this.swipeConf2.activeIndex) {
          return
        }
        if (this.swipeConf2.activeIndex !== -1) {
          const activeItem = this.$refs.swipeItem[this.swipeConf2.activeIndex]
          activeItem.shrink()
        }
        this.swipeConf2.activeIndex = index
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/variable.styl"
  @import "~assets/css/flex.styl"
  html, body, .loading {
    height 100%
    background-color $color-background
  }

  .loading {
    .scroll-box {
      padding-bottom 20px
      .icon {
        img {
          width 60px
          height 60px
          margin-right 10px
        }
      }
      .text {
        h2, p {
          line-height 20px
        }
      }
    }
  }
</style>
