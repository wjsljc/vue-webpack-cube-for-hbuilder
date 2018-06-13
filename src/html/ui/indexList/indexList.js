import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  IndexList,
  Button,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Toast,
} from 'cube-ui'

Vue.use(IndexList)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Toast)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
