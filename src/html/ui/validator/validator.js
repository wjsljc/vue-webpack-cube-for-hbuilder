import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Input,
  Rate,
  Radio,
  Validator,
  Button,
  Switch,
  Select
} from 'cube-ui'

Vue.use(Input)
Vue.use(Rate)
Vue.use(Radio)
Vue.use(Validator)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Select)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
