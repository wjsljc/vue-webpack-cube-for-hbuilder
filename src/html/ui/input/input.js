import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Input,
  Switch
} from 'cube-ui'

Vue.use(Input)
Vue.use(Switch)


new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
