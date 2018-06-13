import Vue from 'vue'
import App from './App'
import 'assets/css/index.styl'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Toast,
  Dialog
} from 'cube-ui'

Vue.use(Button)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(SegmentPicker)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
