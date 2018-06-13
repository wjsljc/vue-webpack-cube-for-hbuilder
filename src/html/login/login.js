import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Dialog,
  Button
} from 'cube-ui'

Vue.use(Dialog)
Vue.use(Button)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
