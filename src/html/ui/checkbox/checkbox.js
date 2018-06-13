import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Checkbox,
  CheckboxGroup
} from 'cube-ui'

Vue.use(Checkbox)
Vue.use(CheckboxGroup)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
