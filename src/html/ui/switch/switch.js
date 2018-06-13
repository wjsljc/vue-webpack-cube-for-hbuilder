import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Switch,
} from 'cube-ui'

Vue.use(Switch)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
