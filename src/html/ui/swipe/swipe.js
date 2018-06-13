import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Swipe,
  ActionSheet,
} from 'cube-ui'

Vue.use(Swipe)
Vue.use(ActionSheet)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
