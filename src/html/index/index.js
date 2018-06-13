import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Loading,
  Tip,
  Popup,
  Toast,
  Picker,
  Slide,
  Dialog
} from 'cube-ui'

Vue.use(Button)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Slide)
Vue.use(Dialog)

/* 整个body下面的点击都没有300ms的延时 */
fastclick.attach(document.body)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
