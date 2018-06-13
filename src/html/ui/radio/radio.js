import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Radio,
} from 'cube-ui'

Vue.use(Radio)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
