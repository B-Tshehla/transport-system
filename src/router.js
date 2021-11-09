import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login.vue'
import Home from './components/home.vue'
import Signup from './components/signup.vue'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {path:'/login',component:Login},
        {path:'/',component:Home},
        {path: '/signup',component:Signup}
    ]
})