import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Switch,
  Rate
} from 'cube-ui'

Vue.use(Switch)
Vue.use(Rate)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
