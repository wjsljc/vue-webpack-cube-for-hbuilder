import Vue from 'vue'
import {} from 'assets/js/utils'
import { plusReady } from 'assets/js/plusReady'
import BaseRow from 'components/baseRow/BaseRow'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Scroll
} from 'cube-ui'

Vue.use(Scroll)

export const webviewMixin = {
  components: {
    BaseRow
  },
  data () {
    return {
      scrollConf: {
        options: {
          stopPropagation: true,
          scrollbar: {
            fade: true
          }
        }
      }
    }
  },
  created () {
    plusReady(() => {
      plus.key.addEventListener('backbutton', function () {
        let currentView = plus.webview.currentWebview()
        currentView.close()
      })
    })
    plusReady(this.plusReady)
  },
  methods: {
    plusReady () {
    
    }
  }
}

export const indexMixin = {
  data () {
    return {
      scrollConf: {
        options: {
          stopPropagation: true,
          scrollbar: {
            fade: true
          }
        }
      }
    }
  },
  created () {
    plusReady(() => {
      let self = this
      plus.key.addEventListener('backbutton', function () {
        self.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '温馨提示',
          content: '您正在退出APP',
          confirmBtn: {
            text: '残忍退出',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '返回',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            let currentView = plus.webview.currentWebview()
            currentView.close()
          },
          onCancel: () => {
            self.$createToast({
              type: 'correct',
              time: 1000,
              txt: '欢迎回来'
            }).show()
          }
        }).show()
      })
    })
    plusReady(this.plusReady)
  },
  methods: {
    plusReady () {
    
    }
  }
}
