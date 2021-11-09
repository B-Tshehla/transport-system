import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueQRCodeComponent from 'vue-qrcode-component'
// Register the Vue component
Vue.component('qr-code', VueQRCodeComponent)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhy6iVtdOuA91oPrFk6zr4dG5r346PCy0",
  authDomain: "student-transport-c3da9.firebaseapp.com",
  projectId: "student-transport-c3da9",
  storageBucket: "student-transport-c3da9.appspot.com",
  messagingSenderId: "77797843144",
  appId: "1:77797843144:web:0e69fcf8971af79e3185fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Register the Vue component
Vue.component('qr-code', VueQRCodeComponent)

new Vue({
  app,
  router,
  render: h => h(App),
}).$mount('#app')
