import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Slide,
} from 'cube-ui'

Vue.use(Slide)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
