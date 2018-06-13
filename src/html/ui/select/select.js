import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Select,
  Switch,
  Toast
} from 'cube-ui'

Vue.use(Select)
Vue.use(Switch)
Vue.use(Toast)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
