import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Form,
  Picker,
  Button,
  Toast,
  Switch,
  DatePicker
} from 'cube-ui'

Vue.use(Form)
Vue.use(Picker)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Switch)
Vue.use(DatePicker)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
