import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Upload,
  Toast,
  Button
} from 'cube-ui'

Vue.use(Upload)
Vue.use(Button)
Vue.use(Toast)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
