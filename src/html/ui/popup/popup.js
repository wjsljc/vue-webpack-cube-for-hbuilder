import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Popup,
  Button
} from 'cube-ui'

Vue.use(Popup)
Vue.use(Button)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
