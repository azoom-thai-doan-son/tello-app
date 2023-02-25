import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import AppButton from './components/AppButton.vue'
import AppModal from './components/AppModal.vue'
import AppInput from './components/AppInput.vue'
import AppHeader from './components/AppHeader.vue'

Vue.component('AppButton', AppButton)
Vue.component('AppModal', AppModal)
Vue.component('AppInput', AppInput)
Vue.component('AppHeader', AppHeader)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
