import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Drawer,
  Button,
  Toast,
  Dialog,
} from 'cube-ui'

Vue.use(Drawer)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
