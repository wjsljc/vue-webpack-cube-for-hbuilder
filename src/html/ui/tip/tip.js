import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Tip,
} from 'cube-ui'

Vue.use(Button)
Vue.use(Tip)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
