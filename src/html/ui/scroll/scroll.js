import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Scroll,
  Button
} from 'cube-ui'

Vue.use(Scroll)
Vue.use(Button)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
